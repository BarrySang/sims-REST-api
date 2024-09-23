const connection = require('../db_setup/db');

exports.createDeposit = (req, res) => {
    const { student_id, amount } = req.body;
  
    // Check if required fields are present
    if (!student_id || !amount) {
      return res.status(400).json({ error: 'Bad Request: student_id and amount are required' });
    }
  
    // Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        // 500 Internal Server Error for transaction start failure
        return res.status(500).json({ error: 'Internal Server Error: Unable to start transaction' });
      }
  
      // Insert into deposits table
      const insertDepositSql = 'INSERT INTO deposits (student_id, amount) VALUES (?, ?)';
      connection.query(insertDepositSql, [student_id, amount], (err, result) => {
        if (err) {
          // Rollback transaction and return 500 if there's a problem with the deposit query
          return connection.rollback(() => {
            res.status(500).json({ error: 'Internal Server Error: Failed to insert deposit' });
          });
        }
  
        // Update statuses table
        const updateStatusSql = 'UPDATE statuses SET status = status + ? WHERE student_id = ?';
        connection.query(updateStatusSql, [amount, student_id], (err, updateResult) => {
          if (err) {
            // Rollback transaction and return 500 if there's a problem with the status update
            return connection.rollback(() => {
              res.status(500).json({ error: 'Internal Server Error: Failed to update status' });
            });
          }
  
          // Commit the transaction if both queries are successful
          connection.commit((err) => {
            if (err) {
              // Rollback transaction and return 500 if commit fails
              return connection.rollback(() => {
                res.status(500).json({ error: 'Internal Server Error: Failed to commit transaction' });
              });
            }
  
            // Respond with 201 Created when everything is successful
            res.status(201).json({
              message: 'Deposit created and status updated',
              depositId: result.insertId
            });
          });
        });
      });
    });
  };
  