// backend/models/Student.js

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cfHandle: {
    type: String,
    required: true,
  },
  currentRating: {
    type: Number,
    default: 0,
  },
  maxRating: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
  remindersSent: {
    type: Number,
    default: 0,
  },
  emailDisabled: {
    type: Boolean,
    default: false,
  },

  // New fields for CF history
  contestHistory: {
    type: Array,
    default: [],
  },
  solvedProblems: {
    type: Array,
    default: [],
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
