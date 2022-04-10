// require and re-export all files in this db directory (users, activities...)
const {
  client,
} = require('./client');
//----------------------------------------------------------------
const {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername
} = require('./users_db')
//----------------------------------------------------------------
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  getRoutinesWithoutActivities,
  getAllRoutinesByUser,
  getRoutineById,
  getAllPublicRoutines,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity

} = require('./routines_db')
//----------------------------------------------------------------
const {
  createActivity,
  getAllActivities,
  getActivitiesbyRoutine,
  getActivityById,
  updateActivity,
  attachActivitiesToRoutines
} = require('./activities_db')
//----------------------------------------------------------------
const {
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine
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
  getRoutinesWithoutActivities,
  getActivityById,
  getActivitiesbyRoutine,
  getUser,
  getUserById,
  getUserByUsername,
  getAllRoutinesByUser,
  getRoutineById,
  getAllPublicRoutines,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutine,
  destroyRoutineActivity,
  updateRoutine,
  updateActivity,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getRoutineActivitiesByRoutine,
  attachActivitiesToRoutines
};