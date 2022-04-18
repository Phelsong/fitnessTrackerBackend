// -------------- READ ME ----------------------------------------
/*
Currently Contains: get all, post NEW

*/
//----------------------------------------------------------------

const express = require("express");
const {
  getAllRoutines,
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine
} = require("../db");
const {
  requireUser
} = require("./helpers")
const routinesRouter = express.Router();

//----------------------------------------------------------------
routinesRouter.get("/", async (req, res) => {
  try {
    const routines = await getAllPublicRoutines();
    res.status(200).send(routines);
  } catch (error) {
    res.status(500).send
  }

});
//----------------------------------------------------------------

//   × Creates a new routine, with the creatorId matching the logged in user (7 ms)
//   √ Requires logged in user (5 ms)
routinesRouter.post('/', requireUser, async (req, res, next) => {
  const {
    isPublic,
    name,
    goal
  } = req.body;
  const {
    id
  } = req.user;
  const info = {
    creatorId,
    isPublic,
    name,
    goal,
  };

  try {
    const newRoutineData = await createRoutine(info);

    res.status(200).send(newRoutineData);
  } catch (error) {
    res.status(500).send
  }
})

//----------------------------------------------------------------

//   × Updates a routine, notably changing public/private, the name, or the goal (6 ms)
routinesRouter.patch('/:RoutineId', async (req, res, next) => {
  try {
      
        
    res.status(204).send();
} catch (error) {
    res.status(500).send
}
})
//----------------------------------------------------------------

//  × Hard deletes a routine. Makes sure to delete all the routineActivities whose routine is the one being deleted. (5 ms)
routinesRouter.delete('/:RoutineId', async (req, res, next) => {
  try {
      
        
    res.status(204).send();
} catch (error) {
    res.status(500).send
}
})
//-----------------------------------------------------------------

//  × Attaches a single activity to a routine.
// × Prevents duplication on (routineId, activityId) pair. (1 ms)
routinesRouter.post('/:RoutineId/activities', requireUser, async (req, res, next) => {
  const {
    routineId: id
  } = req.params;
  try {
    const check = await getRoutineActivitiesByRoutine(id);
    if (check.creatorId === req.user.id) {
      const activity = await addActivityToRoutine(inputs);
      res.status(200).send(activity);
    } else {
      res.status(409).send
    }
  } catch ({
    name,
    message
  }) {
    res.status(500).send
  }
});
//-----------------------------------------------------------------













//----------------------------------------------------------------
module.exports = routinesRouter;