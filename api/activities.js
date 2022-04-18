// -------------- READ ME ----------------------------------------
/*
Currently Contains: 

*/
//----------------------------------------------------------------
const express = require("express");
const {
  getAllActivities,
  createActivity,
  getActivityById,
  updateActivity,
  getPublicRoutinesByActivity
} = require("../db");
const {
  requireUser
} = require("./helpers")
const activitiesRouter = express.Router();
//----------------------------------------------------------------
activitiesRouter.get("/", async (req, res) => {
  try {
    const activities = await getAllActivities()
    res.send(activities)
  } catch (error) {
    res.status(500).send
  }
});
//----------------------------------------------------------------
activitiesRouter.post('/', requireUser, async (req, res, next) => {
  const {
    name,
    description
  } = req.body

  try {
    const newActivityData = await createActivity({
      name,
      description
    })

    res.send(newActivityData)
  } catch (error) {
    res.status(500).send
  }
})
//-----------------------------------------------------------------

// × Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)
activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
  const {
    activityId: id
  } = req.params
  const {
    name,
    description
  } = req.body;

  try {
    const patchedActivityData = await updateActivity(
      id,
      name,
      description,
    );
    res.send(patchedActivityData);
  } catch (error) {
    res.status(500).send
  }
});
//-----------------------------------------------------------------

// × Get a list of all public routines which feature that activity
activitiesRouter.get("/:activityId/routines", async (req, res) => {
  const { activityId : id} = req.params

  try {
      const pubRoutinesActivities = await getPublicRoutinesByActivity(id)

      res.send([pubRoutinesActivities])
  } catch (error) {
      res.status(500).send
  }

})




















//----------------------------------------------------------------
module.exports = activitiesRouter