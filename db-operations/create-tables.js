const fs = require('fs');
const path = require('path');
const connection = require('../db_setup/db.js'); // Adjust the path as necessary

const sqlFilePath = path.join(__dirname, '../db_setup/db.sql');

fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
        console.error('Error reading SQL file:', err);
        return;
    }

    // Split the SQL statements by semicolon, but ignore the last empty statement
    const sqlStatements = sql.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

    // Function to execute SQL statements in sequence
    const executeStatements = (statements) => {
        if (statements.length === 0) {
            console.log('All tables created successfully.');
            connection.end(); // Close the connection
            return;
        }

        const currentStatement = statements[0];

        connection.query(currentStatement, (err, results) => {
            if (err) {
                console.error('Error executing SQL:', err);
            } else {
                console.log('Executed:', currentStatement);
            }
            // Recursively execute the next statement
            executeStatements(statements.slice(1));
        });
    };

    // Start executing SQL statements
    executeStatements(sqlStatements);
});
