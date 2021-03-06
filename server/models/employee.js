/*
============================================
; Title: employee.js
; Author: Professor Krasso
: Modified by: Adam Luna
; Date: 16 August 2021
; Description: Employee Model JS file
;===========================================
*/
// import statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemDocument = require("./item");

// create employee schema
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [ItemDocument],
    done: [ItemDocument],
  },
  { collection: "employees" } // specify collection in database
);

// export employeeSchema
module.exports = mongoose.model("Employee", employeeSchema);