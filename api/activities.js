// -------------- READ ME ----------------------------------------
/*
Currently Contains: get all, post NEW,

*/
//----------------------------------------------------------------
const express = require("express");
const { getAllActivities, createActivity, getActivityById } = require("../db");
const activitiesRouter = express.Router();
//----------------------------------------------------------------
activitiesRouter.get("/", async (req, res) => {
    const [activities] = await getAllActivities();
    console.log(activities);
    res.send({
      activities
    });
  });
//----------------------------------------------------------------
activitiesRouter.post('/', async (req, res, next) => { 
  const {} = req.body
 const newActivityData = await createActivity()
 console.log(newActivityData)
 res.send({
    newActivityData
  });
})
//-----------------------------------------------------------------

    // × Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)
activitiesRouter.patch('/:activityId', async (req, res, next) => { 
    const {} = req.body
    const patchedActivityData = await getActivityById()
    console.log(patchedActivityData)
    res.send(patchedActivityData)

})
//-----------------------------------------------------------------

    // × Get a list of all public routines which feature that activity
activitiesRouter.get("/:activityId/routines", async (req, res) => {
    const activities = await getAllActivities();
    console.log(activities);
    res.send({
      activities
    });
  });





















//----------------------------------------------------------------
module.exports = activitiesRouter