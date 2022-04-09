// -------------- READ ME ----------------------------------------
/*
Currently Contains: 

*/
//----------------------------------------------------------------

const express = require("express");
const { getAllRoutinesByUser } = require("../db");
const routine_activitiesRouter = express.Router();

//----------------------------------------------------------------
routine_activitiesRouter.get("/", async (req, res) => {
    const routine_activities = await getAllRoutinesByUser();
    console.log(routine_activities);
    res.send({
      routine_activities
    });
  });
//----------------------------------------------------------------

    // × Updates the count or duration on the routine activity (6 ms)
    //× Logged in user should be the owner of the modified object. (6 ms)
routine_activitiesRouter.patch('/:RoutineActivityId', async (req, res, next) => { 
    const newRoutineData = await getAllRoutinesByUser();
    console.log(newRoutineData)

})
//----------------------------------------------------------------

    //× Removes an activity from a routine, uses hard delete (10 ms)
    //× Logged in user should be the owner of the modified object. (6 ms)
routine_activitiesRouter.delete('/:RoutineActivityId', async (req, res, next) => { 
    const deletedRoutineData = getAllRoutinesByUser();
    console.log(deletedRoutineData)

})





















//----------------------------------------------------------------
module.exports = routine_activitiesRouter