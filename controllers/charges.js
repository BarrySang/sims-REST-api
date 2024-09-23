const connection = require('../db_setup/db'); // Database connection

// execute charges
exports.createCharge = (req, res) => {
  const structure_id = req.body.structure_id; // Assuming structure_id is passed in the request body

  // Start a transaction
  connection.beginTransaction(err => {
    if (err) {
      console.log('Transaction error:', err);
      return res.status(500).json({ error: 'Transaction error' });
    }

    // Step 1: Get structure details (amount and grades)
    const getStructureQuery = `SELECT amount, grades FROM structures WHERE id = ?`;

    connection.query(getStructureQuery, [structure_id], (err, structureResult) => {
      if (err) {
        console.log('Error fetching structure:', err);
        return connection.rollback(() => res.status(500).json({ error: 'Error fetching structure' }));
      }
      if (structureResult.length === 0) {
        console.log('Structure not found for ID:', structure_id);
        return connection.rollback(() => res.status(404).json({ error: 'Structure not found' }));
      }

      const { amount, grades } = structureResult[0];
      const gradesList = grades.split(','); // Assuming grades are comma-separated

      // Step 2: Get students who match the grades from the statuses table
      const getStudentsQuery = `
        SELECT s.student_id 
        FROM statuses s 
        JOIN students ON s.student_id = students.id 
        WHERE students.grade_id IN (?)
      `;

      connection.query(getStudentsQuery, [gradesList], (err, studentsResult) => {
        if (err) {
          console.log('Error fetching students:', err);
          return connection.rollback(() => res.status(500).json({ error: 'Error fetching students' }));
        }
        if (studentsResult.length === 0) {
          console.log('No students found for the given grades:', gradesList);
          return connection.rollback(() => res.status(404).json({ error: 'No students found for the given grades' }));
        }

        // Step 3: Process each student in the list
        const promises = studentsResult.map(student => {
          return new Promise((resolve, reject) => {
            // Update student's status (subtract amount)
            const updateStatusQuery = `
              UPDATE statuses 
              SET status = status - ? 
              WHERE student_id = ?
            `;

            connection.query(updateStatusQuery, [amount, student.student_id], (err, result) => {
              if (err) {
                console.log('Error updating status for student_id:', student.student_id, err);
                return reject(err);
              }

              // Insert into charges table
              const insertChargeQuery = `INSERT INTO charges (structure_id, student_id) VALUES (?, ?)`;

              connection.query(insertChargeQuery, [structure_id, student.student_id], (err, chargeResult) => {
                if (err) {
                  console.log('Error inserting charge for student_id:', student.student_id, err);
                  return reject(err);
                }
                resolve(chargeResult);
              });
            });
          });
        });

        // Step 4: Wait for all promises to resolve
        Promise.all(promises)
          .then(results => {
            // Commit the transaction
            connection.commit(err => {
              if (err) {
                console.log('Transaction commit error:', err);
                return connection.rollback(() => res.status(500).json({ error: 'Transaction commit error' }));
              }
              res.status(200).json({ message: 'Charges created successfully', results });
            });
          })
          .catch(err => {
            console.log('Error processing charges:', err);
            // If any error occurs, rollback the transaction
            connection.rollback(() => res.status(500).json({ error: 'Error processing charges' }));
          });
      });
    });
  });
};
