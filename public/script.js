function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var fnInput = document.getElementById('fname');
    var lnInput = document.getElementById('lname');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('number');
    var passInput = document.getElementById('password');
    var dateInput = document.getElementById('date')
    
    var fname = fnInput.value.trim()
    var lname = lnInput.value.trim()
    var email = emailInput.value.trim()
    var phone = phoneInput.value.trim()
    var date = dateInput.value.trim()
    var password = passInput.value.trim()

    // Create new entry object
    var entry = {
        fristName : fname,
        lastName : lname,
        email : email,
        dateOfBrith : date,
        phone : phone,
        password : password
      };

    // Retrieve existing data from localStorage or initialize empty array
    var existingData = JSON.parse(localStorage.getItem("formData")) || [];

    // Add new entry to existing data
    existingData.push(entry);

    // Save updated data to localStorage
    localStorage.setItem("formData", JSON.stringify(existingData));


    // Display success message
    alert("Form data submitted successfully!");
  }