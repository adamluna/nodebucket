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
let itemSchema = new Schema({
    text: { type: String }
});

// export itemSchema
module.exports = itemSchema