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
async function getRoutinesWithoutActivities() {
    try {
        const {
            rows
        } = await client.query(`
    SELECT * FROM routines
    LEFT JOIN routine_activities ON routines.id=routine_activities."routineId"
    WHERE "routineId" is NULL;
    `)
        return rows
    } catch (e) {
        console.error(e, "error getting routines without activities")
        throw e
    }
}
//----------------------------------------------------------------
async function getAllRoutinesByUser(userId) {
    try {
        const {
            rows: routineIds
        } = await client.query(`
        SELECT id
        FROM routines
        WHERE "creatorId"=${ userId };
      `);

        const uRoutines = await Promise.all(routineIds.map(
            r => getRoutineById(r.id)
        ));

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
module.exports = {
    getAllRoutines,
    createRoutine,
    getRoutinesWithoutActivities,
    getAllRoutinesByUser,
    getRoutineById
}