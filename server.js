const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();

// Use bodyParser middleware to handle JSON request body
app.use(bodyParser.json());

// Google Sheets API setup
const sheets = google.sheets({ version: 'v4', auth: '84e5aa997c2bbcbc9e9ae3d5fd95a161' });

// Route for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Read Google Sheets data (replace with your actual spreadsheet ID and range)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR1DcVzTvNBbLbgsrMQ9nAq9crN1Sw7jyryMSFpuyKfYKI',// Replace with your actual Google Sheets ID
        range: 'Sheet1!A:D',  // Adjust range as needed (columns for username, password, name, grade)
    });

    const rows = response.data.values;

    // Check if the provided username and password match any rows in the sheet
    for (const row of rows) {
        if (row[0] === username && row[1] === password) {
            // If a match is found, return the name and grade
            return res.json({ name: row[2], grade: row[3] });
        }
    }

    // If no match is found, return an error message
    res.status(401).json({ message: 'Invalid credentials' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
