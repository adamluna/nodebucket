/*
    code attribution goes here
*/

//import require statements
const express = require('express');
const Employee = require('../models/employee');

//create router object
const router = express.Router();

/**
 * code comments
 */
router.get('/:empId', async (req, res) =>
{
    /**
     * code comments
     */
    try
    {
        /**
         * code comments
         */
        Employee.findOne({'empId': req.params.empId}, function(err, employee)
        {
            /**
             * code comments
             */
            if(err)
            {
                console.log(err);
                res.status(500).send({
                    'message': 'MongoDB server error: ' + err.message
                })
            }
            /**
             * code comments
             */
            else{
                console.log(employee);
                res.json(employee);
            }
        })
    }
    /**
     * code comments
     */
    catch(e)
    {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error: ' + e.message
        })
    }
})

//export router
module.exports = router;

