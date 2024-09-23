const db = require('../db_setup/db.js'); // Import the database connection

async function dropAllTables() {
  try {
    // Disable foreign key checks
    db.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop tables
    db.query('DROP TABLE IF EXISTS charges');
    db.query('DROP TABLE IF EXISTS deposits');
    db.query('DROP TABLE IF EXISTS statuses');
    db.query('DROP TABLE IF EXISTS structures');
    db.query('DROP TABLE IF EXISTS students');

    // Re-enable foreign key checks
    db.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    db.end(); // Close the connection
  }
}

dropAllTables();
