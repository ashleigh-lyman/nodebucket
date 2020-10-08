/*
============================================
; Title:  employee-api.js
; Author: Ashleigh Lyman
; Date:   04 October 2020
; Modified By: Ashleigh Lyman
; Description: Employee API component. Holds all APIs with database
;===========================================
*/


const express = require('express');
const { consoleTestResultHandler } = require('tslint/lib/test');
const { readJsonConfigFile } = require('typescript');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

//API: findEmployeeById
//Returns JSON employee object
router.get('/:empId', async(req, res) => {
    try {

        Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {

            if (err) {
                console.log(err);

                res.status(500).send({
                    'message': 'Internal server error!!'
                })
            } else {
                console.log(employee);

                res.json(employee);
            }
        })

    } catch (e) {

        console.log(e);

        res.status(500).send({
            'message': 'Internal server error!'
        });
    }

})



//API: findAllTasks
//GET request to return employees records in database FindAllTasks
router.get('/:empId/tasks', async(req, res) => {
    try {

        Employee.findOne({ 'empId': req.params.empId }, 'empId todo done', function(err, employee) {

            if (err) {
                console.log(err);
                const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(mongoDbErrorResponse.toObject())
            } else {
                console.log(employee);

                const employeeTaskResponse = new BaseResponse('200', 'Query Success', employee);
                res.json(employeeTaskResponse.toObject());
            }
        })

    } catch (e) {
        console.log(e);

        const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(errorCatchResponse.toObject());
    }

})

//API: createTask
//Creates a task under select employee id
router.post('/:empId/tasks', async(req, res) => {
    try {

        Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {

            if (err) {
                console.log(err);
                const createTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(createTaskMongoDbErrorResponse.toObject())
            } else {
                console.log(employee);
                //create new item object
                const item = {
                    text: req.body.text
                };
                //push new item to array
                employee.todo.push(item);
                employee.save(function(err, updatedEmployee) {


                    if (err) {
                        console.log(err);
                        const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                        res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject())
                    } else {
                        console.log(updatedEmployee);
                        //create new item object
                        const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful Entry', updatedEmployee);
                        res.json(createTaskOnSaveSuccessResponse.toObject());
                    }
                })
            }
        })

    } catch (e) {
        console.log(e);

        const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(createTaskCatchErrorResponse.toObject());
    }

})

//API: updateTask
//Updates task between todo and done columns. Essentially just moves task from array to array
router.put('/:empId/tasks', async(req, res) => {
    try {

        Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {

            if (err) {
                console.log(err);
                const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(updateTaskMongoDbErrorResponse.toObject())
            } else {
                console.log(employee);

                employee.set({
                    todo: req.body.todo,
                    done: req.body.done
                });

                employee.save(function(err, updatedEmployee) {
                    if (err) {
                        console.log(err);

                        const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                        res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
                    } else {
                        console.log(updatedEmployee);
                        const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful update', updatedEmployee);
                        res.json(updatedTaskOnSaveSuccessResponse.toObject());
                    }
                })

            }
        })

    } catch (e) {
        console.log(e);

        const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(updateTaskCatchErrorResponse.toObject());
    }

})

//API: deleteTask
//Removes/deletes a task from either list
router.delete('/:empId/tasks/:taskId', async(req, res) => {

    try {
        Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
            if (err) {
                console.log(err);
                const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());
            } else {
                console.log(employee);

                const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
                const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

                if (todoItem) {
                    employee.todo.id(todoItem._id).remove();
                    employee.save(function(err, updatedTodoItemEmployee) {
                        if (err) {
                            console.log(err);
                            const deleteTodoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                            res.status(500).send(deleteTodoItemOnSaveMongoDbErrorResponse.toObject());
                        } else {
                            console.log(updatedTodoItemEmployee);
                            const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Removed item from the To Do list.', updatedTodoItemEmployee);
                            res.json(deleteTodoItemSuccessResponse.toObject());
                        }
                    })
                } else if (doneItem) {
                    employee.done.id(doneItem._id).remove();
                    employee.save(function(err, updatedDoneItemEmployee) {
                        if (err) {
                            console.log(err);
                            const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                            res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
                        } else {
                            console.log(updateDoneItemEmployee);
                            const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from the Done.', updatedDoneItemEmployee);
                            res.json(deleteDoneItemSuccessResponse.toObject());
                        }
                    })
                } else {
                    console.log('Invalid task Id');
                    const deleteTaskNotFoundResponse = new ErrorResponse('500', 'Unable to locate the requested Task Id.', null);
                    res.status(500).send(deleteTaskNotFoundResponse.toObject());
                }
            }
        })
    } catch (e) {
        console.log(e);
        const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
        res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }

})

//Makes APIs global for application
module.exports = router;
