/*
============================================
; Title:  app.js
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: Application file
;===========================================
*/


const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const EmployeeApi = require('./routes/employee-api');

//gives access to employee model in employee.js
const Employee = require('./models/employee');


// App configurations

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(morgan('dev'));

//This tells node js how to serve up our ang application
//Serves up static content
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));


//Variables
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://web450_user:Lymanfamily1@buwebdev-cluster-1.akyor.mongodb.net/nodebucket?retryWrites=true&w=majority';


//Database connection

mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.debug(`Connection to the database instance was successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection


/*API(s) go here... */
//Connected to employee-api.js and receives the requested API data

app.use('/api/employees', EmployeeApi);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`)
});

// end http create server function
