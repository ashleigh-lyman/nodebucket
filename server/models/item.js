/*
============================================
; Title:  item.js
; Author: Ashleigh Lyman
; Date:   04 October 2020
; Modified By: Ashleigh Lyman
; Description: Item schema module
;===========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('./item');



//Creates new item schema with type string
let itemSchema = new Schema({
    text: { type: String }

})


//Makes schema global for application
module.exports = itemSchema;
