// -------------- READ ME ----------------------------------------
/*
Currently Contains: get all, post NEW

*/
//----------------------------------------------------------------

const express = require("express");
const { getAllRoutines, createRoutine } = require("../db");
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
routinesRouter.post('/routines/create', async (req, res, next) => { // ***** QUESTION ON KEEPING ID AND USERNAME IN TOKEN*/
    const newRoutineData = await createRoutine()
    console.log(newRoutineData)
    res.send({
       newRoutineData
     });
   })
//----------------------------------------------------------------



















//----------------------------------------------------------------
module.exports = routinesRouter;