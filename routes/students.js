const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/', studentsController.getStudents);
router.post('/', studentsController.createStudent);
router.delete('/:id', studentsController.deleteStudent);
router.put('/:id', studentsController.updateStudent);

module.exports = router;
