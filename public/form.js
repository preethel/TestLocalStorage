const formE1 = document.querySelector('.form');


function validateForm(event){
  
    event.preventDefault()

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

    if (fname === ''){
        alert("please enter your first name");
        fnInput.focus();
        return false;
    }
    else if (lname === ''){
        alert("please enter your last name");
        lnInput.focus();
        return false;
    }

    else if (email === ''){
        alert("Email field shouldn't be blank!")
        emailInput.focus();
        return false;
    }

    else if (phone === ''){
        alert("phone field shouldn't be blank!")
        phoneInput.focus()
        return false;
    }

    if (!isEmailValid(email)){
        alert("please enter a valid email address! ");
        emailInput.focus();
        return false;
    }
    else if (!isPhoneValid(phone)){
        alert("please enter valid BD phone number");
        phoneInput.focus();
        return false;
    }
    else if (!isPasswordSecure(password)){
        alert("Please enter a valid password and Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)")
        passInput.focus();
        return false;
    }
    
    var formDataArray = [];
    formDataArray.push({
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone,
      dob: date
    });
  
    // Check if existing data is already stored in local storage
    var existingData = localStorage.getItem('formEntries');
    var existingDataArray = existingData ? JSON.parse(existingData) : [];
  
    // Add the new form entries to the existing data
    existingDataArray.push(...formDataArray);
  
    // Store the updated data in local storage
    localStorage.setItem('formEntries', JSON.stringify(existingDataArray));
    // Send the data to the server
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataArray)
  })
    .then(function(response) {
      if (response.ok) {
        // Display a success alert message
        alert('Form data submitted successfully!');
      } else {
        // Display a failure alert message
        alert('Failed to submit form data!');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      // Display a failure alert message
      alert('Failed to submit form data!');
    });

    // Rest of your existing code...

  }


const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9-_]+@[^\s@]+\.[a-zA-Z]{3,}$/;
    return re.test(email)
};

const isPhoneValid = (phone) => {
    const re = /^01[356789]\d{8}$/;
    return re.test(phone)
}
const isPasswordSecure = (password) => {
    const re = /^(?=.*\d)[a-zA-Z0-9]{4,}$/;
    return re.test(password);
};
