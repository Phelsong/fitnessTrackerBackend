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

module.exports = {
    createActivity,
    getAllActivities,
    getActivitiesbyRoutine,
    getActivityById,
    updateActivity
}