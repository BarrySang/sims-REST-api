const db = require('../db_setup/db.js'); // Import the database connection

// Sample data
const studentsData = [
    { id: 1, name: 'John Doe', grade_id: 101 },
    { id: 2, name: 'Jane Smith', grade_id: 102 },
    { id: 3, name: 'Sam Brown', grade_id: 103 },
    { id: 4, name: 'Sam Brown2', grade_id: 104 },
    { id: 5, name: 'Sam Brown3', grade_id: 105 },
    { id: 6, name: 'Sam Brown4', grade_id: 106 }
];

const structuresData = [
    { id: 1, title: 'Tuition Fee', amount: 50000, grades: '101,102,103' },
    { id: 2, title: 'Library Fee', amount: 5000, grades: '101,102' },
    { id: 3, title: 'other1 Fee', amount: 2000, grades: '104,105' },
    { id: 4, title: 'other2 Fee', amount: 2000, grades: '106' }
];

const chargesData = [
    { structure_id: 1, student_id: 1 },
    { structure_id: 2, student_id: 2 }
];

const depositsData = [
    { student_id: 1, amount: 25000 },
    { student_id: 2, amount: 30000 }
];

const statusesData = [
    { student_id: 1, status: 20000 },
    { student_id: 2, status: -1000 },
    { student_id: 3, status: 0 },
    { student_id: 4, status: -100 },
    { student_id: 5, status: 1000 },
    { student_id: 6, status: 8000 },
];

// Helper function to insert data
const insertData = (query, data) => {
    return new Promise((resolve, reject) => {
        db.query(query, data, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Seed function
const seedDatabase = async () => {
    try {
        // Insert into students
        for (const student of studentsData) {
            await insertData(
                'INSERT INTO students (id, name, grade_id) VALUES (?, ?, ?)',
                [student.id, student.name, student.grade_id]
            );
        }

        // Insert into structures
        for (const structure of structuresData) {
            await insertData(
                'INSERT INTO structures (id, title, amount, grades) VALUES (?, ?, ?, ?)',
                [structure.id, structure.title, structure.amount, structure.grades]
            );
        }

        // Insert into charges (foreign keys require students and structures data)
        for (const charge of chargesData) {
            await insertData(
                'INSERT INTO charges (structure_id, student_id) VALUES (?, ?)',
                [charge.structure_id, charge.student_id]
            );
        }

        // Insert into deposits (requires students data)
        for (const deposit of depositsData) {
            await insertData(
                'INSERT INTO deposits (student_id, amount) VALUES (?, ?)',
                [deposit.student_id, deposit.amount]
            );
        }

        // Insert into statuses (requires students data)
        for (const status of statusesData) {
            await insertData(
                'INSERT INTO statuses (student_id, status) VALUES (?, ?)',
                [status.student_id, status.status]
            );
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        db.end(); // Close the database connection
    }
};

seedDatabase();
