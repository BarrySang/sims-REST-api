const connection = require('../db_setup/db');

// Get all structures
exports.getStructures = (req, res) => {
    const sql = 'SELECT * FROM structures';
  
    connection.query(sql, (err, results) => {
      if (err) {
        // 500 Internal Server Error if there's a problem with the query
        return res.status(500).json({ error: 'Internal Server Error: Failed to retrieve structures', details: err.message });
      }
  
      if (results.length === 0) {
        // 404 Not Found if no structures are found
        return res.status(404).json({ message: 'No structures found' });
      }
  
      // 200 OK if structures are successfully retrieved
      res.status(200).json(results);
    });
  };
  