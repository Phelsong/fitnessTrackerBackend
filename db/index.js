// require and re-export all files in this db directory (users, activities...)
const {
    client,  createUser, createActivity, createRoutine, getAllActivities, getAllRoutines, addActivityToRoutine, getRoutinesWithoutActivities, getActivitiesById, getActivitiesbyRoutine
  } = require('./client');

module.exports = {
    createUser, createActivity, createRoutine, getAllActivities, getAllRoutines, addActivityToRoutine, getRoutinesWithoutActivities, getActivitiesById, getActivitiesbyRoutine
  };