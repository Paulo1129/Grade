const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Load Google Sheets API credentials
const sheets = google.sheets({ version: 'v4', auth: '84e5aa997c2bbcbc9e9ae3d5fd95a161e8e11a' });

// Route for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Read Google Sheets data
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR1DcVzTvNBbLbgsrMQ9nAq9crN1Sw7jyryMSFpuyKfYKI',
        range: 'Sheet1!A:D',
    });

    const rows = response.data.values;

    for (const row of rows) {
        if (row[0] === username && row[1] === password) {
            return res.json({ name: row[2], grade: row[3] });
        }
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
