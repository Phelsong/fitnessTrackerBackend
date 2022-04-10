const {
    client
} = require('./client');
//----------------------------------------------------------------
async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration
}) {

    try {
        const {
            rows: [routineActivities]
        } = await client.query(`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES($1, $2, $3, $4)
        RETURNING *; 
      `, [routineId, activityId, count, duration]);
        return routineActivities

    } catch (error) {
        console.error("error creating routine_activities: " + error)
        throw error;
    }
}


//---------------------------------------------------------------
async function updateRoutineActivity({
    id,
    count,
    duration
}) {
    try {
        const {
            rows: [activity],
        } = await client.query(
            `
        UPDATE routine_activities
        SET count=COALESCE($2, count),
        duration=COALESCE($3, duration)
        WHERE id=$1
        RETURNING*;
        `,
            [id, count, duration]
        );
        return activity;
    } catch (error) {
        console.error('error updating routine_activities:')
        throw error;
    }
}
//----------------------------------------------------------------
async function destroyRoutineActivity(id) {
    try {
        const {
            rows: [activity],
        } = await client.query(
            `
        DELETE
        FROM routine_activities
        WHERE routine_activities.id=$1
        RETURNING*
        `,
            [id]
        );
        return activity;
    } catch (error) {
        console.error('error deleting routine_activities:')
        throw error;
    }
}
//----------------------------------------------------------------
module.exports = {
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
}