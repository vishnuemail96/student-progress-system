const express = require('express');
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Route to add a new student
router.post('/', addStudent);

// Route to get all students
router.get('/', getAllStudents);

// Route to get a single student by ID
router.get('/:id', getStudentById);

// Route to update student by ID
router.put('/:id', updateStudent);

// Route to delete student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
