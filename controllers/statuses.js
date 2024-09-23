const connection = require('../db_setup/db');

exports.getStatuses = (req, res) => {
    const sql = `
      SELECT statuses.student_id, statuses.status, students.name, students.grade_id
      FROM statuses
      JOIN students ON statuses.student_id = students.id
    `;
    
    connection.query(sql, (err, results) => {
      if (err) {
        // If there's a server-side error
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
      
      if (results.length === 0) {
        // No statuses found in the database
        return res.status(404).json({ message: 'No statuses found' });
      }
      
      // If everything is successful and results are found
      res.status(200).json(results);
    });
  };
  