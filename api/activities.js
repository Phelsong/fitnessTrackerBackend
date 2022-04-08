// -------------- READ ME ----------------------------------------
/*
Currently Contains: 

*/
//----------------------------------------------------------------
const express = require("express");
const { getAllActivities, createActivity } = require("../db");
const activitiesRouter = express.Router();
//----------------------------------------------------------------
activitiesRouter.get("/", async (req, res) => {
    const activities = await getAllActivities();
    console.log(activities);
    res.send({
      activities
    });
  });
//----------------------------------------------------------------
activitiesRouter.post('/createactivity', async (req, res, next) => { // ***** QUESTION ON KEEPING ID AND USERNAME IN TOKEN*/
 const newActivityData = await createActivity()
 console.log(newActivityData)
 res.send({
    newActivityData
  });
})
//-----------------------------------------------------------------




















//----------------------------------------------------------------
module.exports = activitiesRouter