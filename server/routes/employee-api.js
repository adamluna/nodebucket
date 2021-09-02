/*
============================================
; Title: employee-api.js
; Author: Adam Luna
; Date: 16 August 2021
; Description: Employee API JS file
;===========================================
*/
//import statements
const express = require("express");
const BaseResponse = require("../models/base-response");
const employee = require("../models/employee");
const Employee = require("../models/employee");

//create router object
const router = express.Router();

// get employee using empId
router.get("/:empId", async (req, res) => {
  // find one employee using empId
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      // log an error and return a 500 error if the employee ID cannot be found
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB server error: " + err.message,
        });
      }
      // log the employee object in the console if the employee ID can be found
      else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    /**
     * catch additional errors and log them to the console
     * return a 500 error and display a message
     * */
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/**
 * findAllTasks API
 */
router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo done",
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: "MongoDB exception: " + err.message,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/**
 * createTask API
 */
router.post('/:empId/tasks', async(req, res) => {
    try
    {
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            if (err)
            {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception: ' + err.message
                })
            }
            else
            {
                console.log(employee);

                const newTask = {
                    text: req.body.text
                };

                employee.todo.push(newTask);
                employee.save(function(err, updatedEmployee) {
                    if(err)
                    {
                        console.log(err);
                        res.status(501).send({
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
    catch
    {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error: ' + e.message
        })
    }
})

/**
 * updateTask APi
*/
router.put('/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err)
      {
        console.log(err);
        const updateTaskServerErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(updateTaskServerErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        })

        employee.save(function(err, updatedEmployee) {
          if (err)
          {
            console.log(err);
            const updateTaskMongoOnsaveErrorResponse = new BaseResponse('501', 'Mongo server error', err);
            res.status(501).send(updateTaskSucessResponse.toObject());
          }
          else
          {
            console.log(updatedEmployee);
            const updateTaskServerErrorResponse = new BaseResponse('200', 'Update successful', updatedEmployee);
            res.status(200).send(updateTaskServerErrorResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(err);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal server error', e);
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
})

/**
 * deleteTask API
*/
router.delete('/:empId/tasks/:taskId', async(req,res) => {
  try{
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);

        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);

        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      }
      else {
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Item removed from the todo array', updatedTodoItemEmployee);
              res.status(200).send(deleteTodoItemSuccessResponse.toObject());
            }
          })
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updateDoneItemEmployee) {
            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
            } else {
              console.log(updateDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item removed from teh array', updateDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          })
        } else {
          console.log('Invalid taskId');
          const deleteTaskNotFoundResponse = new BaseResponse('300', 'Unable to locate the requested resource', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  }
  catch (e)
  {
      console.log(e);

      const deleteTaskServerError = new BaseResponse('500', 'Internal server error', e);

      res.status(500).send(deleteTaskServerError.toObject());
  }
})

//export router
module.exports = router;
