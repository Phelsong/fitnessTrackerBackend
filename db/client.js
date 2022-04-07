// build and export your unconnected client here
const { Client } = require("pg");
require("dotenv").config();
const LOGIN = process.env.DB_login;


// activities/routines = activities/routines table ref
// activity/routines = routine_ activities table ref
//----------------------------------------------------------------
const client = new Client({connectionString: process.env.DATABASE_URL || `postgres://${LOGIN}@localhost:5432/fitness-dev`,
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined});


 
//----------------------------------------------------------------
// GETALL functions start:
async function getAllUsers(){
    const { rows } = await client.query(
      `SELECT id, username, name
      FROM users;
    `
    );
  
    return rows;
}
//----------------------------------------------------------------
async function getAllActivities(){
  const { rows } = await client.query(
    `SELECT name, id
    FROM activities;
  `);
  return rows;
}

//----------------------------------------------------------------
async function getAllRoutines(){
  const { rows } = await client.query(
    `SELECT name
    FROM routines;
  `);

  return rows;
}
//----------------------------------------------------------------
async function getRoutinesWithoutActivities(){
  try {
  const { rows } = await client.query(`
  SELECT * FROM routines
  LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
  WHERE "routineId" is NULL;
  `)
  return rows
} catch (e) {
  console.error(e, "error getting routines without activities")
  throw e
}

}
//----------------------------------------------------------------
//CREATE functions start:
async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}
//----------------------------------------------------------------
async function createActivity({name, description}) {
  
  try {
    const { rows : activities } = await client.query(`
      INSERT INTO activities ( name, description )
      VALUES($1, $2) 
      RETURNING *;  
    `, [name, description] );

     return activities

  } catch (error) {
    console.error("error creating activity")
    throw error;
  }
}
//----------------------------------------------------------------
async function createRoutine({creatorId, isPublic, name, goal}) {
  
// creatorId: 1,
// isPublic: true,
// name: 'Chest Day',
// goal: 'To beef up the Chest and Triceps!'

  try {
    const { rows : [routine] } = await client.query(
      `
      INSERT INTO routines ("creatorId", "isPublic", name,
        goal) 
      VALUES($1, $2, $3, $4) 
      RETURNING *;  
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine
  } catch (error) {
    console.error("error creating routine")
    throw error;
  }
}
//-----------------------------------------------------------------
async function addActivityToRoutine({routineId, activityId, count, duration}) {

  try {
    const { rows : routineActivities} =await client.query(`
      INSERT INTO routine_activities ("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *; 
    `, [routineId, activityId, count, duration]
    );
    return routineActivities

  } catch (error) {
    console.error("error creating routine_activities: " + error)
    throw error;
  }
}
//----------------------------------------------------------------







async function getActivitiesById(activitiesId) {
  try {
    const { rows: [ activities ]  } = await client.query(`
      SELECT *
      FROM activitiess
      WHERE id=$1;
    `, [activitiesId]);

    if (!activities) {
      throw {
        name: "activitiesNotFoundError",
        message: "Could not find a activities with that activitiesId"
      };
    }

    const { rows: routines } = await client.query(`
      SELECT routines.*
      FROM routines
      JOIN routine_activities ON routines.id=routine_activities."routineId"
      WHERE routine_activities."activityId"=$1;
    `, [activitiesId])

    const { rows: [author] } = await client.query(`
      SELECT id, username, name, location
      FROM users
      WHERE id=$1;
    `, [activities.authorId])

    activities.routines = routines;
    activities.author = author;

    delete activities.authorId;

    return activities;
  } catch (error) {
    throw error;
  }
}
//----------------------------------------------------------------
async function getActivitiesbyRoutine(tagName) {
  try {
    const { rows: activitiesIds } = await client.query(`
      SELECT activities
      FROM activities
      JOIN routine_activities ON activities.id=routine_activities."activityId"
      JOIN routines ON routinies.id=routine_activities."routineId"
      WHERE routines.name=$1;
    `, [routineName]);

    return await Promise.all(activitiesIds.map(
      thing => getActivitiesById(activities.id)
    ));
  } catch (error) {
    throw error;
  }
} 


//----------------------------------------------------------------
module.exports = {client, getAllUsers, getAllActivities, getAllRoutines, createUser, createActivity, createRoutine, addActivityToRoutine, getActivitiesById, getActivitiesbyRoutine, getRoutinesWithoutActivities}