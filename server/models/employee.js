/*
============================================
; Title: employee.js
; Author: Adam Luna
; Date: 16 August 2021
; Description: Employee Model JS file
;===========================================
*/
// import statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create employee schema
let employeeSchema = new Schema({
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String }
}, {collection: 'employees'}) // specify collection in database

// export employeeSchema
module.exports = mongoose.model('Employee', employeeSchema);

