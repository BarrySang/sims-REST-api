// db.js
require('dotenv').config(); // Load environment variables

const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
    console.log('Connected to the database');
});

module.exports = connection; // Export the connection for use in other files
