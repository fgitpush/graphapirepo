const mongoose = require('mongoose');

// Define the Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },               // Employee's name
  age: { type: Number },                                // Employee's age
  class: { type: String },                              // Employee's class/grade
  subjects: { type: [String] },                         // Subjects the employee is associated with
  attendance: { type: Number },                         // Attendance percentage
  role: { type: String, enum: ['admin', 'employee'], required: true }  // Role of the employee (admin or employee)
});

// Create and export the Employee model
module.exports = mongoose.model('Employee', employeeSchema);
