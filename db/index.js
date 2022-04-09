// require and re-export all files in this db directory (users, activities...)
const {
  client,
} = require('./client');
//----------------------------------------------------------------
const {
  createUser,
  getAllUsers,
  getUser,
  getUserById
} = require('./users_db')
//----------------------------------------------------------------
const {
  getAllRoutines,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutinesByUser,
  getRoutineById
} = require('./routines_db')
//----------------------------------------------------------------
const {
  createActivity,
  getAllActivities,
  getActivitiesbyRoutine,
  addActivityToRoutine,
  getActivityById
} = require('./activities_db')
//----------------------------------------------------------------
const {

} = require('./routine_activities_db')
//----------------------------------------------------------------
module.exports = {
  client,
  createUser,
  createActivity,
  createRoutine,
  getAllUsers,
  getAllActivities,
  getAllRoutines,
  addActivityToRoutine,
  getRoutinesWithoutActivities,
  getActivityById,
  getActivitiesbyRoutine,
  getUser,
  getUserById,
  getAllRoutinesByUser,
  getRoutineById
};