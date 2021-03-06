/*
============================================
; Title: app.ja
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 16 August 2021
; Description: App JS file
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');                        
const path = require('path');
const mongoose = require('mongoose');
const EmployeeAPI = require('./routes/employee-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const PORT = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket_user:admin@buwebdev-cluster-1.j3npe.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/employees', EmployeeAPI); // use EmployeeAPI file

/**
 * Create and start server
 */
 http.createServer(app).listen(PORT, function () {
  console.log(`Application started and listening on port: ${ PORT }`);
}); // end http create server function
