const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.static('public'));

// app.post('/submit', function(req, res) {
//   // Get the form data from the request body
//   const formData = req.body;

//   // Read the existing data from the JSON file
//   let data = [];
//   try {
//     const jsonData = fs.readFileSync('data.json', 'utf8');
//     data = JSON.parse(jsonData);
//   } catch (err) {
//     console.error(err);
//   }

//   // Add the new form data to the array
//   data.push(formData);

//   // Write the updated data to the JSON file
//   fs.writeFile('data.json', JSON.stringify(data), 'utf8', function(err) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error saving form data');
//     } else {
//       res.status(200).send('Form data saved successfully');
//     }
//   });
// });

app.post('/submit', function(req, res) {
  // Get the form data from the request body
  const formData = req.body;

  // Read the existing data from the JSON file
  let data = [];
  try {
    const jsonData = fs.readFileSync('data.json', 'utf8');
    data = JSON.parse(jsonData);
  } catch (err) {
    console.error(err);
  }

  // Generate a unique ID for the new entry
  const newEntryId = generateUniqueId();

  // Add the new entry with a unique ID to the data
  const newEntry = {
    id: newEntryId,
    ...formData
  };
  data.push(newEntry);

  // Write the updated data to the JSON file
  fs.writeFile('data.json', JSON.stringify(data), 'utf8', function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving form data');
    } else {
      res.status(200).send('Form data saved successfully');
    }
  });
});

// Function to generate a unique ID
function generateUniqueId() {
  // Implementation to generate a unique ID
  // You can use a library like 'uuid' or a custom implementation based on your requirements
  // Example: const uniqueId = uuid.v4();
  // Return the generated unique ID
}



app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
