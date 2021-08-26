/*
============================================
; Title: item.js
; Author: Professor Krasso
: Modified by: Adam Luna
; Date: 23 August 2021
; Description: Item schema sJS file
;===========================================
*/
// import statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create and define itemSchema
const itemSchema = new mongoose.Schema({
    text: { type: String }
  });

// export itemSchema
module.exports = itemSchema;