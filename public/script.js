function updateCheckbox(checkbox) {
  var checkboxes = document.getElementsByName(" ");
  checkboxes.forEach(function (cb) {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });
}

function showRegistration() {
  document.getElementById("registration").style.display = "block";
  document.getElementById("list").style.display = "none";
}

function showList() {
  document.getElementById("registration").style.display = "none";
  document.getElementById("list").style.display = "block";

  var userList = document.getElementById("userList");
  userList.innerHTML = ""; // Clear previous entries

  // Retrieve data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Create table rows for each entry
  existingData.forEach(function (entry, index) {
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

// Function to open the edit modal with pre-filled data
function openEditModal(index) {
  // Retrieve existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Get the entry to edit based on the index
  var entry = existingData[index];

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
  editForm.elements["editIndex"].value = index;

  // Perform form submission or other actions
  editForm.onsubmit = submitEditForm;

  // Show the edit modal
  $("#editModal").modal("show");
}

// Function to update the entry with edited data
// function updateEntry() {
//   var index = document.getElementById("editIndex").value;

//   var existingData = JSON.parse(localStorage.getItem("formData")) || [];
//   var entry = existingData[index];

//   // Update the entry with the edited data from the modal fields
//   entry.fristName = document.getElementById("editFname").value.trim();
//   entry.lastName = document.getElementById("editLname").value.trim();
//   entry.email = document.getElementById("editEmail").value.trim();
//   entry.phone = document.getElementById("editPhone").value.trim();
//   entry.dateOfBrith = document.getElementById("editDate").value.trim();
//   // entry.comment = document.getElementById("editComment").value.trim();
//   entry.gender = document.getElementById("editGender").value.trim();
//   // entry.password = document.getElementById("editPassword").value.trim();

//   // Save the updated data back to localStorage
//   localStorage.setItem("formData", JSON.stringify(existingData));

//   // Close the modal
//   $("#editModal").modal("hide");

//   // Refresh the list to display the updated data
//   showList();
// }
// ...

function submitEditForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var editFnameInput = document.getElementById('editFname');
  var editLnameInput = document.getElementById('editLname');
  var editEmailInput = document.getElementById('editEmail');
  var editPhoneInput = document.getElementById('editPhone');
  var editDateInput = document.getElementById('editDate');
  // var editCommentInput = document.getElementById('editComment');
  var editGenderInput = document.getElementById('editGender');
  // var editPasswordInput = document.getElementById('editPassword');
  var editIndexInput = document.getElementById('editIndex');

  // Retrieve existing data from localStorage
  var existingData = JSON.parse(localStorage.getItem("formData")) || [];

  // Get the index of the entry being edited
  var editIndex = parseInt(editIndexInput.value);

  // Update the entry with the edited values
  existingData[editIndex].fristName = editFnameInput.value.trim();
  existingData[editIndex].lastName = editLnameInput.value.trim();
  existingData[editIndex].email = editEmailInput.value.trim();
  existingData[editIndex].phone = editPhoneInput.value.trim();
  existingData[editIndex].dateOfBrith = editDateInput.value.trim();
  // existingData[editIndex].comment = editCommentInput.value.trim();
  existingData[editIndex].gender = editGenderInput.value;
  // existingData[editIndex].password = editPasswordInput.value.trim();

  // Save updated data to localStorage
  localStorage.setItem("formData", JSON.stringify(existingData));

  // Hide the modal
  $('#editModal').modal('hide');

  // Refresh the list
  showList();
}

// ...


function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var fnInput = document.getElementById('fname');
    var lnInput = document.getElementById('lname');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('number');
    var passInput = document.getElementById('password');
    var dateInput = document.getElementById('date');
    var commentInput = document.getElementById('comment');
    var gender = "";
    
    var fname = fnInput.value.trim()
    var lname = lnInput.value.trim()
    var email = emailInput.value.trim()
    var phone = phoneInput.value.trim()
    var date = dateInput.value.trim()
    var comment = commentInput.value.trim()
    var password = passInput.value.trim()


    var checkboxes = document.getElementsByName("gender");
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          gender = checkbox.value;
        }
      });

    // Create new entry object
    var entry = {
        fristName : fname,
        lastName : lname,
        email : email,
        dateOfBrith : date,
        phone : phone,
        gender : gender,
        comment : comment,
        password : password
      };

      var checkValid = 1;
    
      //Regular Expression validation 
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
      function validatePassword(password) {
        const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{4,}$/;
        return passwordRegex.test(password);
        }
      

    // Retrieve existing data from localStorage or initialize empty array
    var existingData = JSON.parse(localStorage.getItem("formData")) || [];


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
 
  
    if(checkValid != 1){
        alert("Please fill correctly.");
    }
    else{

    // Add new entry to existing data
    existingData.push(entry);

    // Save updated data to localStorage
    localStorage.setItem("formData", JSON.stringify(existingData));


    // Display success message
    alert("Form data submitted successfully!");


    // Reset form fields
    //document.getElementById("userDataForm").reset();

  }

  }