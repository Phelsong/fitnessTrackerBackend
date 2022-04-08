// -------------- READ ME ----------------------------------------
/*
Currently Contains: get all, post NEW

*/
//----------------------------------------------------------------

const express = require("express");
const { getAllRoutines, createRoutine, getRoutineById } = require("../db");
const routinesRouter = express.Router();

//----------------------------------------------------------------
routinesRouter.get("/", async (req, res) => {
    const routines = await getAllRoutines();
    console.log(routines);
    res.send({
      routines
    });
  });
//----------------------------------------------------------------

    //   × Creates a new routine, with the creatorId matching the logged in user (7 ms)
    //   √ Requires logged in user (5 ms)
routinesRouter.post('/', async (req, res, next) => { 
    const newRoutineData = await createRoutine()
    console.log(newRoutineData)
    res.send({
       newRoutineData
     });
   })
//----------------------------------------------------------------

    //   × Updates a routine, notably changing public/private, the name, or the goal (6 ms)
routinesRouter.patch('/:RoutineId', async (req, res, next) => { 
    const newRoutineData = await getRoutineById()
    console.log(newRoutineData)

})
//----------------------------------------------------------------

    //  × Hard deletes a routine. Makes sure to delete all the routineActivities whose routine is the one being deleted. (5 ms)
routinesRouter.delete('/:RoutineId', async (req, res, next) => { 
    const deletedRoutineData = await getRoutineById()
    console.log(deletedRoutineData)

})
//-----------------------------------------------------------------

        //  × Attaches a single activity to a routine.
        // × Prevents duplication on (routineId, activityId) pair. (1 ms)
routinesRouter.post('/:RoutineId/activities', async (req, res, next) => { 
    const newRoutineData = await createRoutine()
    console.log(newRoutineData)
    res.send({
       newRoutineData
     });
   })

//-----------------------------------------------------------------













//----------------------------------------------------------------
module.exports = routinesRouter;