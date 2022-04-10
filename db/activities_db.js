const {
    client
} = require('./client');
//----------------------------------------------------------------
async function getAllActivities() {
    const {
        rows: allActivities
    } = await client.query(`
      SELECT *
      FROM activities;
    `);
    return allActivities;
}
//----------------------------------------------------------------
async function createActivity({
    name,
    description
}) {

    try {
        const {
            rows: [newActivity]
        } = await client.query(`

        INSERT INTO activities ( name, description )
        VALUES($1, $2) 
        RETURNING *;

      `, [name, description]);

        return newActivity

    } catch (error) {
        console.error("error creating activity")
        throw error;
    }
}
//----------------------------------------------------------------
async function updateActivity({
    id,
    name,
    description
}) {
    try {
        const {
            rows: [activity],
        } = await client.query(
            `
            UPDATE activities
            SET name=$2,
            description=$3
            WHERE id=$1
            RETURNING *;`, [id, name, description])

        return activity

    } catch (error) {
        console.error("error updating Activity")
        throw error;
    }
}

//----------------------------------------------------------------
async function getActivityById(activityId) {
    try {
        const {
            rows: [activity]
        } = await client.query(`
          SELECT *
          FROM activities
          WHERE id=$1 
        `, [activityId]);

        return activity;
    } catch (error) {
        console.error("error getting Activity")
        throw error;
    }
}
//----------------------------------------------------------------
async function getActivityByIdiiiiiiiii(activitiesId) {
    try {
        const {
            rows: [activities]
        } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=$1;
      `, [activitiesId]);

        if (!activities) {
            throw {
                name: "activitiesNotFoundError",
                message: "Could not find a activities with that activitiesId"
            };
        }
        const {
            rows: routines
        } = await client.query(`
        SELECT routines.*
        FROM routines
        JOIN routine_activities ON routines.id=routine_activities."routineId"
        WHERE routine_activities."activityId"=$1;
      `, [activitiesId])

        const {
            rows: [author]
        } = await client.query(`
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
        const {
            rows: activitiesIds
        } = await client.query(`
        SELECT activities
        FROM activities
        JOIN routine_activities ON activities.id=routine_activities."activityId"
        JOIN routines ON routinies.id=routine_activities."routineId"
        WHERE routines.name=$1;
      `, [routineName]);

        return await Promise.all(activitiesIds.map(
            thing => getActivityById(activities.id)
        ));
    } catch (error) {
        throw error;
    }
}

async function attachActivitiesToRoutines(routines) {
    // no side effects
    const routinesToReturn = [...routines];
    const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
    const routineIds = routines.map(routine => routine.id);
    if (!routineIds?.length) return [];
    
    try {
      // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${ binds });
      `, routineIds);
  
      // loop over the routines
      for(const routine of routinesToReturn) {
        // filter the activities to only include those that have this routineId
        const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
        // attach the activities to each single routine
        routine.activities = activitiesToAdd;
      }
      return routinesToReturn;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    createActivity,
    getAllActivities,
    getActivitiesbyRoutine,
    getActivityById,
    updateActivity,
    attachActivitiesToRoutines
}