// require and re-export all files in this db directory (users, activities...)
const {
    client, createUser, createActivity, createRoutine, getAllUsers, getAllActivities, getAllRoutines, addActivityToRoutine, getRoutinesWithoutActivities, getActivitiesById, getActivitiesbyRoutine, 
  } = require('./client');

module.exports = {
    client, createUser, createActivity, createRoutine, getAllUsers, getAllActivities, getAllRoutines, addActivityToRoutine, getRoutinesWithoutActivities, getActivitiesById, getActivitiesbyRoutine, 
  };