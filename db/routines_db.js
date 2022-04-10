const {
    client
} = require('./client');
const {
    attachActivitiesToRoutines
} = require('./activities_db')
const {
    getUser,
    getUserByUsername
} = require('./users_db')
//----------------------------------------------------------------
async function getAllRoutines() {
    try {
        const {
            rows
        } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    INNER JOIN users ON users.id = routines."creatorId";
    `);
        const allRoutines = await attachActivitiesToRoutines(rows)

        return allRoutines;
    } catch (error) {
        console.error("error getting all routines", error);
        throw error;
    }
}
//----------------------------------------------------------------
async function createRoutine({
    creatorId,
    isPublic,
    name,
    goal
}) {

    // creatorId: 1,
    // isPublic: true,
    // name: 'Chest Day',
    // goal: 'To beef up the Chest and Triceps!'

    try {
        const {
            rows: [routine]
        } = await client.query(
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
//----------------------------------------------------------------
async function updateRoutine({
    id,
    isPublic,
    name,
    goal
}) {
    try {
        const {
            rows: [routine],
        } = await client.query(
            `
        UPDATE routines
        SET "isPublic"= COALESCE($2, routines."isPublic"),
        name=COALESCE($3, name),
        goal=COALESCE($4, goal)
        WHERE routines.id=$1
        RETURNING *;
        `,
            [id, isPublic, name, goal]
        );
        return routine;
    } catch (error) {
        console.error("error updating routine")
        throw error;
    }
}
//----------------------------------------------------------------
async function destroyRoutine(id) {
    try {
        await client.query(`
          DELETE
          FROM routines
          WHERE id=$1;
          `, [id]);
        await client.query(`
          DELETE 
          FROM routine_activities
          WHERE routine_activities."routineId"=$1;
          `, [id]);

    } catch (error) {
        console.error("error deleting routine")
        throw error;
    }
}



//----------------------------------------------------------------
async function getRoutinesWithoutActivities() {
    try {
        const {
            rows
        } = await client.query(`
    SELECT * FROM routines
    `)
        return rows
    } catch (e) {
        console.error(e, "error getting routines without activities")
        throw e
    }
}
//----------------------------------------------------------------
async function getAllRoutinesByUser(username) {
    // id (number): This is the database identifier for the routine object.
    // creatorId (number): This is the database identifier for the user which created this routine
    // creatorName (string): This is the username for the user which created this routine
    // isPublic (boolean): Whether or not the routine should be visible to all users (will always be true for public routes)
    // name (string): This is the name (or title) of the routine.
    // goal (string): This is like the description of the routine.
    // activity (array of activity objects): An array of activities associated with this routine.
    // id (number): This is the database identifier for the activity
    // name (string): This is the name (or title) of the activity.
    // description (string): This is the description of the activity.
    // duration (number): This is how long (in minutes) this activity should be performed for this routine.
    // count (number): This is the number of times (reps) this activity should be performed for this routine.
    // routineActivityId (number): This is the database identifier for the routine_activity
    // routineId (number): This is the database identifier for the routine

    try {
        const {
            id
        } = await getUser(username);
        const {
            rows: uRoutines
        } = await client.query(`
              SELECT routines.*, users.username AS "creatorName"
              FROM routines
              JOIN users ON routines."creatorId" = users.id 
              WHERE "creatorId" = $1
              AND "isPublic" = true
              `, [id]);
        const result = await attachActivitiesToRoutines(uRoutines)
        return result

    } catch (e) {
        console.error("error getting routines from user" + username)
        throw e;
    }
}
//----------------------------------------------------------------
async function getRoutineById(routineId) {
    try {
        const {
            rows: [routine]
        } = await client.query(`
        SELECT *
        FROM routines
        WHERE id=$1;
      `, [routineId]);
        if (!routine) {
            throw {
                name: "RoutineNotFoundError",
                message: "Routine with that ID does not exist"
            };
        }

        return routine;
    } catch (error) {
        console.error("error getting routines with ID" + routineId, error);
        throw error;
    }
}
//----------------------------------------------------------------

async function getAllPublicRoutines() {

    // id (number): This is the database identifier for the routine
    // name (string): This is the name (or title) of the routine.
    // goal (string): This is like the description of the routine.
    // creatorId (number): This is the database identifier for the user which created this routine
    // isPublic (boolean): Whether or not the routine should be visible to all users. null by default
    // creatorName (string): This is the username for the user which created this routine

    try {
        const {
            rows: routines
        } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE "isPublic" = true
    `);
        const result = attachActivitiesToRoutines(routines)
        return result


    } catch (error) {
        console.error(e, "error getting public routines")
        throw error;
    }
}
//----------------------------------------------------------------
async function getPublicRoutinesByUser(username) {

    try {
        const {
            id
        } = await getUser(username);
        const {
            rows: uRoutines
        } = await client.query(`

        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id 
        WHERE "creatorId" = $1
        AND "isPublic" = true

              `, [id])
        const result = await attachActivitiesToRoutines(uRoutines)
        return result

    } catch (error) {
        console.error("error getting routines from user")
        throw error;
    }
}
//----------------------------------------------------------------
async function getPublicRoutinesByActivity({
    id
}) {
    try {
        const {
            rows: routines
        } = await client.query(`

      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routine_activities."routineId" = routines.id
      WHERE routines."isPublic" = true
      AND routine_activities."activityId" = $1;

    `, [id]);
        return attachActivitiesToRoutines(routines);

    } catch (error) {
        console.error("error getting publick routines by activityId")
        throw error;
    }
}

//----------------------------------------------------------------
module.exports = {
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
}