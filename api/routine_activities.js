// -------------- READ ME ----------------------------------------
/*
Currently Contains: 

*/
//----------------------------------------------------------------

const express = require("express");
const { getAllRoutinesByUser } = require("../db");
const routine_activitiesRouter = express.Router();
const {requireUser } = require("./helpers")


//----------------------------------------------------------------

    // × Updates the count or duration on the routine activity (6 ms)
    //× Logged in user should be the owner of the modified object. (6 ms)
routine_activitiesRouter.patch('/:RoutineActivityId', requireUser, async (req, res, next) => { 
    try {
      
        
        res.status(204).send();
    } catch (error) {
        res.status(500).send
    }
})
//----------------------------------------------------------------

    //× Removes an activity from a routine, uses hard delete (10 ms)
    //× Logged in user should be the owner of the modified object. (6 ms)
routine_activitiesRouter.delete('/:RoutineActivityId', requireUser, async (req, res, next) => { 
    try {
        const {routineActivityId : id} = req.params


        res.status(204).send();
    } catch (error) {
        res.status(500).send
    }
})





















//----------------------------------------------------------------
module.exports = routine_activitiesRouter