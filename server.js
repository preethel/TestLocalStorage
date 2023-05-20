const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
