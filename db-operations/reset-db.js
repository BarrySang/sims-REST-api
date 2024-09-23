const fs = require('fs');
const db = require('../db_setup/db.js'); // Import the database connection

// Helper function to run queries
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Function to reset the database
const resetDatabase = async () => {
    try {
        // Disable foreign key checks
        await runQuery('SET FOREIGN_KEY_CHECKS = 0');

        // Drop tables one by one
        await runQuery('DROP TABLE IF EXISTS charges');
        await runQuery('DROP TABLE IF EXISTS deposits');
        await runQuery('DROP TABLE IF EXISTS statuses');
        await runQuery('DROP TABLE IF EXISTS structures');
        await runQuery('DROP TABLE IF EXISTS students');

        console.log('Tables dropped successfully.');

        // Re-enable foreign key checks
        await runQuery('SET FOREIGN_KEY_CHECKS = 1');

        // Read and execute the SQL file to recreate the tables
        const sql = fs.readFileSync('./db_setup/db.sql', 'utf8');
        await runQuery(sql);

        console.log('Tables recreated successfully.');
    } catch (error) {
        console.error('Error resetting database:', error.sqlMessage || error);
    } finally {
        db.end(); // Close the database connection
    }
};

// Run the reset function
resetDatabase();
