/*
============================================
; Title:  employee.js
; Author: Ashleigh Lyman
; Date:   27 September 2020
; Modified By: Ashleigh Lyman
; Description: employee model database mapping
;===========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('./item')



//Telling mongoose how to map to the collection referenced in MongoDB
let employeeSchema = new Schema({
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [item],
    done: [item]

    //References collection in MongoDB *employees*
}, { collection: 'employees' })


//Triggers global use of this model
module.exports = mongoose.model('Employee', employeeSchema);
