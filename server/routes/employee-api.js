/*
============================================
; Title: employee-api.js
; Author: Adam Luna
; Date: 16 August 2021
; Description: Employee API JS file
;===========================================
*/
//import statements
const express = require('express');
const Employee = require('../models/employee');

//create router object
const router = express.Router();

// get employee using empId
router.get('/:empId', async (req, res) =>
{
    // find one employee using empId 
    try
    {
        Employee.findOne({'empId': req.params.empId}, function(err, employee)
        {
            // log an error and return a 500 error if the employee ID cannot be found
            if(err)
            {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB server error: ' + err.message
                })
            }
            // log the employee object in the console if the employee ID can be found
            else{
                console.log(employee);
                res.json(employee);
            }
        })
    }
    /**
     * catch additional errors and log them to the console
     * return a 500 error and display a message
     * */ 
    catch(e)
    {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error: ' + e.message
        })
    }
})

/**
 * findAllTasks API
 */
router.get('/:empId/tasks', async(req,res) => {
    try
    {
        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
            if(err)
            {

               console.log(err);
               res.status(501).send({
                   'message': 'MongoDB exception: ' + err.message
               })
            }
            else{
                console.log(employee);
                res.json(employee);
            }
        })
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error: ' + e.message
        })
    }
})

/**
 * createTask API
 */
router.post('/:empId/tasks', async(req, res) => {
    try
    {
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            if(err)
            {
                console.log(err);
                res.status(500).send({
                    'message': 'MongoDB Exception: ' + err.message
                })
            }
            else{
                console.log(employee);

                const newTask = {
                    text: req.body.text
                };
                employee.todo.push(newTask);
                employee.save(function(err, updatedEmployee){
                    if(err)
                    {
                        console.log(err);
                        res.status(501).send ({
                            'message': 'MongoDB Exception: ' + err.message
                        })
                    }
                    else
                    {
                        console.log(updatedEmployee);
                        res.json(updatedEmployee);
                    }
                })
            }
        })
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error:p ' + e.message
        })
    }
})


//export router
module.exports = router;

