let currentPage = 1; // Current page number
let lastPage = 0;
//navigate for registration form
function showRegistration() {
  document.getElementById("registration").style.display = "block";
  document.getElementById("list").style.display = "none";
}

//For gender field udate the checkbox when select on male unclick unselect for female
function updateCheckbox(checkbox) {
  var checkboxes = document.getElementsByName("gender");

  if (checkbox.checked) {
    checkboxes.forEach(function (cb) {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  }
}

//Validation functions
function validateRegularExpression(text) {
  // Regular expression pattern for name validation (only allows letters, spaces, and hyphens)
  var pattern = /^[a-zA-Z\s-\s.]+$/;

  return pattern.test(text);
}

//Email Validation
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9-_]+@[^\s@]+\.[a-zA-Z]{3,}$/;
  return emailRegex.test(email);
}

//Mobile validation
function validateMobileNumber(mobile) {
  const mobileNumberRegex = /^01\d{9}$/;
  return mobileNumberRegex.test(mobile);
  //<!-- pattern="01[0-9]{9}" -->
}

//password validation
function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{4,}$/;
  return passwordRegex.test(password);
}

//Registration Form Submission
function submitForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var fnInput = document.getElementById("fname");
  var lnInput = document.getElementById("lname");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("number");
  var passInput = document.getElementById("password");
  var dateInput = document.getElementById("date");
  var commentInput = document.getElementById("comment");
  var gender = "";

  var fname = fnInput.value.trim();
  var lname = lnInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var date = dateInput.value.trim();
  var comment = commentInput.value.trim();
  var password = passInput.value.trim();

  var checkboxes = document.getElementsByName("gender");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      gender = checkbox.value;
    }
  });

  var checkValid = 1;

  // Create new entry object

  if (validateRegularExpression(fname)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid First name.");
    checkValid = 0;
  }
  if (validateRegularExpression(lname)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid Last name.");
    checkValid = 0;
  }

  if (validateEmail(email)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid email.");
    checkValid = 0;
  }

  if (validateMobileNumber(phone)) {
    // proceed with form submission or other actions
  } else {
    alert("Please enter a valid Mobile No. start with 01.");
    checkValid = 0;
  }
  if (validatePassword(password)) {
    // proceed with form submission or other actions
  } else {
    alert("Please enter password Strongly!");
    checkValid = 0;
  }

  if (checkValid != 1) {
    console.log("Validation Error!");
  } else {
    var entry = {
      fristName: fname,
      lastName: lname,
      email: email,
      dateOfBrith: date,
      phone: phone,
      gender: gender,
      comment: comment,
      password: password,
    };
    //Regular Expression validation

    // Retrieve existing data from localStorage or initialize empty array
    var existingData = JSON.parse(localStorage.getItem("formData")) || [];

    // Add new entry to existing data
    existingData.push(entry);

    // Save updated data to localStorage
    localStorage.setItem("formData", JSON.stringify(existingData));

    // Display success message
    alert("Form data submitted successfully!");

    // Reset form fields
    document.getElementById("myForm").reset();
    showList();
  }
}

//update page
function nextPage() {
  if (currentPage < lastPage) {
    currentPage++;
  }
  showList();
}

//update previous page
function previousPage() {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
  }
  showList();
}

var searchItem = [];
function searchForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var nameInput = document.getElementById("nameFilter");
  var emailInput = document.getElementById("emailFilter");
  var phoneInput = document.getElementById("mobileFilter");
  var dateInput = document.getElementById("dobFilter");
  var genderInput = document.getElementById("genderFilter");

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var date = dateInput.value.trim();
  var gender = genderInput.value.trim();

  name = name.toLowerCase();
  email = email.toLowerCase();
  phone = phone.toLowerCase();
  date = date.toLowerCase();
  gender = gender.toLowerCase();

  searchItem = {
    fristName: name,
    lastName: name,
    email: email,
    phone: phone,
    dateOfBrith: date,
    gender: gender,
  };
  showList();
}

//generate Employee list
//generate Edit and delete button
function showList() {
  document.getElementById("registration").style.display = "none";
  document.getElementById("list").style.display = "block";

  var userList = document.getElementById("userList");
  userList.innerHTML = ""; // Clear previous entries
  // Retrieve data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];
  // Clear previous entries
  var userList = document.getElementById("userList");
  userList.innerHTML = "";

  // Calculate total number of pages
  const totalEntries = existingData.length;
  const pageSize = 5;
  const totalPages = Math.ceil(totalEntries / pageSize);
  lastPage = totalPages;
  // Example usage

  let paginatedData = paginate(existingData, pageSize, currentPage);

  var search = searchEntries(searchItem);
  if (search.length != 0) {
    paginatedData = paginate(search, pageSize, currentPage);
  }
  // Create table rows for each filtered entry
  paginatedData.forEach(function (entry, index) {
    // existing code to create table rows
    // ...
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var fname = entry.fristName;
    var lname = entry.lastName;

    var name = fname.concat(" " + lname);

    nameCell.textContent = name;
    var emailCell = document.createElement("td");
    emailCell.textContent = entry.email;
    var phoneCell = document.createElement("td");
    phoneCell.textContent = entry.phone;
    var dobCell = document.createElement("td");
    dobCell.textContent = entry.dateOfBrith;
    var genderCell = document.createElement("td");
    genderCell.textContent = entry.gender;

    var actionsCell = document.createElement("td");
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary", "mr-2");
    editButton.setAttribute("data-toggle", "modal");
    editButton.setAttribute("data-target", "#editModal");
    editButton.addEventListener("click", function () {
      openEditModal(index);
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", function () {
      deleteEntry(index);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(dobCell);
    row.appendChild(genderCell);
    row.appendChild(actionsCell);
    userList.appendChild(row);
  });
}

// Function to paginate the data
function paginate(array, page_size, page_number) {
  --page_number; // Adjust page number to 0-based index
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}
// Function to open the edit modal with pre-filled data
function openEditModal(id) {
  // Retrieve existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Get the entry to edit based on the id
  var entry = existingData[id];

  // Populate the edit form with the entry data
  var editForm = document.getElementById("editForm");
  editForm.elements["editFname"].value = entry.fristName;
  editForm.elements["editLname"].value = entry.lastName;
  editForm.elements["editEmail"].value = entry.email;
  editForm.elements["editPhone"].value = entry.phone;
  editForm.elements["editDate"].value = entry.dateOfBrith;
  // editForm.elements["editComment"].value = entry.comment;
  editForm.elements["editGender"].value = entry.gender;
  // editForm.elements["editPassword"].value = entry.password;
  editForm.elements["id"].value = id;

  // Perform form submission or other actions
  editForm.onsubmit = submitEditForm;

  // Show the edit modal
  $("#editModal").modal("show");
}

//Modal form submission
function submitEditForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var editFnameInput = document.getElementById("editFname");
  var editLnameInput = document.getElementById("editLname");
  var editEmailInput = document.getElementById("editEmail");
  var editPhoneInput = document.getElementById("editPhone");
  var editDateInput = document.getElementById("editDate");
  // var editCommentInput = document.getElementById('editComment');
  var editGenderInput = document.getElementById("editGender");
  // var editPasswordInput = document.getElementById('editPassword');
  var idInput = document.getElementById("id");

  // Get the index of the entry being edited
  var id = parseInt(idInput.value);

  var fname = editFnameInput.value.trim();
  var lname = editLnameInput.value.trim();
  var email = editEmailInput.value.trim();
  var phone = editPhoneInput.value.trim();

  var checkValid = 1;

  if (validateRegularExpression(fname)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid First name.");
    checkValid = 0;
  }
  if (validateRegularExpression(lname)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid Last name.");
    checkValid = 0;
  }

  if (validateEmail(email)) {
    //  proceed with form submission or other actions
  } else {
    alert("Please enter a valid email.");
    checkValid = 0;
  }

  if (validateMobileNumber(phone)) {
    // proceed with form submission or other actions
  } else {
    alert("Please enter a valid Mobile No. start with 01.");
    checkValid = 0;
  }

  if (checkValid != 1) {
    alert("Please fill correctly.");
  } else {
    // Retrieve existing data from localStorage
    var existingData = JSON.parse(localStorage.getItem("formData")) || [];
    existingData[id].fristName = fname;
    existingData[id].lastName = lname;
    existingData[id].email = email;
    existingData[id].phone = phone;
    existingData[id].dateOfBrith = editDateInput.value.trim();
    // existingData[id].comment = editCommentInput.value.trim();
    existingData[id].gender = editGenderInput.value;
    // existingData[id].password = editPasswordInput.value.trim();
    // Save updated data to localStorage
    localStorage.setItem("formData", JSON.stringify(existingData));

    // Hide the modal
    $("#editModal").modal("hide");

    // Refresh the list
    showList();
  }
}

//Function for detele entry
function deleteEntry(id) {
  // Retrieve existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Remove the entry at the specified id
  existingData.splice(id, 1);

  // Save updated data to localStorage
  localStorage.setItem("formData", JSON.stringify(existingData));

  // Show the updated list
  showList();
}
// Function to search entries by multiple fields
function searchEntries(searchInput) {
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];
  var searchResults = [];

  const searchFirstName = searchInput.fristName
    ? searchInput.fristName.toLowerCase()
    : null;
  const searchLastName = searchInput.lastName
    ? searchInput.lastName.toLowerCase()
    : null;
  const searchEmail = searchInput.email
    ? searchInput.email.toLowerCase()
    : null;
  const searchDateOfBrith = searchInput.dateOfBrith
    ? searchInput.dateOfBrith.toLowerCase()
    : null;
  const searchPhone = searchInput.phone
    ? searchInput.phone.toLowerCase()
    : null;
  const searchGender = searchInput.gender
    ? searchInput.gender.toLowerCase()
    : null;

  console.log("searchGender =>", searchGender);

  const clonedData = [...existingData];
  searchResults = clonedData.filter((person) => {
    console.log("dateOfBrith =>", person.gender);
    const nameMatch =
      !searchFirstName ||
      !searchLastName ||
      person.fristName
        .toLowerCase()
        .startsWith(searchFirstName.toLowerCase()) ||
      person.lastName.toLowerCase().startsWith(searchLastName.toLowerCase());
    const emailMatch =
      !searchEmail ||
      person.email.toLowerCase().includes(searchEmail.toLowerCase());
    const phoneMatch = !searchPhone || person.phone.startsWith(searchPhone);
    const dateOfBrithMatch =
      !searchDateOfBrith ||
      person.dateOfBrith.toLowerCase() === searchDateOfBrith.toLowerCase();

    const genderhMatch =
      !searchGender ||
      person.gender.toLowerCase() === searchGender.toLowerCase();
      console.log("genderMatch =>",genderhMatch);

    return nameMatch && emailMatch && phoneMatch && dateOfBrithMatch && genderhMatch;
  });
  return searchResults;
}