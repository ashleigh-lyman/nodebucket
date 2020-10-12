/*
============================================
; Title:  base-response.js
; Author: Ashleigh Lyman
; Date:   04 October 2020
; Modified By: Ashleigh Lyman
; Description: Base response message function for successful work
;===========================================
*/

//Base response class and functions to format and gather data to be displayed
class BaseResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }

    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

module.exports = BaseResponse;
