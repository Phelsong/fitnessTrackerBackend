const {
    client
} = require('./client');
//----------------------------------------------------------------
async function getAllRoutines(userId) {
    const {
        rows: allRoutines
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    INNER JOIN users ON users.id = routines."creatorId";
    `);

    return allRoutines;
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
        SET "isPublic"=COALESCE($2, routines."isPublic"),
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
          `,[id]);
        await client.query(`
          DELETE 
          FROM routine_activities
          WHERE routine_activities."routineId"=$1;
          `,[id]);

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
async function getAllRoutinesByUser(userId) {
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
            rows: [uRoutines]
        } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE username = $1  
      `, userId);



        return uRoutines;
    } catch (error) {
        throw error;
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

        // const { rows: routineActivities } = await client.query(`
        //   SELECT *
        //   FROM routine_activities
        //   JOIN routine_activities ON activities.id=routine_activities."routineId"
        //   WHERE routine_activities."routineId"=$1;
        // `, [routineId])

        // const { rows: [creator] } = await client.query(`
        //   SELECT id, username, name, location
        //   FROM users
        //   WHERE id=$1;
        // `, [routine.creatorId])

        // routine.creatorId = creator;


        return routine;
    } catch (error) {
        throw error;
    }
}
//----------------------------------------------------------------

async function getAllPublicRoutines() {
    try {
        const {
            rows: [routines]
        } = await client.query(
            `
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        WHERE "isPublic" = $1
        `,
            [true]
        );

        return routines
    } catch (error) {
        throw error;
    }
}
//----------------------------------------------------------------
async function getPublicRoutinesByUser() {
    try {
       
    } catch (error) {
        throw error;
    }
}
//----------------------------------------------------------------
async function getPublicRoutinesByActivity() {
    try {
        
    } catch (error) {
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