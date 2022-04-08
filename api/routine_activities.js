// -------------- READ ME ----------------------------------------
/*
Currently Contains: 

*/
//----------------------------------------------------------------

const express = require("express");
const { getRoutinesByUser } = require("../db");
const routine_activitiesRouter = express.Router();

//----------------------------------------------------------------
routine_activitiesRouter.get("/", async (req, res) => {
    const routine_activities = await getRoutinesByUser();
    console.log(routine_activities);
    res.send({
      routine_activities
    });
  });






















//----------------------------------------------------------------
module.exports = routine_activitiesRouter