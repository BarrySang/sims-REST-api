const fs = require('fs');
const path = require('path');
const db = require('../db_setup/db.js'); // This is where your MySQL connection is exported

// Read the db.sql file
const sqlFilePath = path.join(__dirname, '../db_setup/db.sql');
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf-8');

// Function to execute the SQL query
async function setupDatabase() {
    try {
        // Run the SQL query
        await db.query(sqlQuery);
        console.log('Database setup successfully.');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        // Close the database connection
        db.end();
    }
}

// Execute the setup function
setupDatabase();
