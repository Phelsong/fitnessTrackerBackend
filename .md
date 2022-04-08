 createUser({ username, password })
        × Creates the user (4 ms)
        × EXTRA CREDIT: Does not store plaintext password in the database
        × EXTRA CREDIT: Hashes the password (salted 10 times) before storing it to the database (1 ms)
        × Does NOT return the password
      getUser({ username, password })
        × Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)
        × Does NOT return the password (1 ms)
      getUserById
        × Gets a user based on the user Id (1 ms)
    Activities
      getAllActivities
        × selects and returns an array of all activities (1 ms)
      createActivity({ name, description })
        × Creates and returns the new activity (1 ms)
      updateActivity
        × Updates name and description of an activity without affecting the ID. Returns the updated Activity. (4 ms)
    Routines
      getActivityById
        × gets activities by their id (8 ms)
      getAllRoutines
        × selects and returns an array of all routines, includes their activities (2 ms)
        × includes username, from users join, aliased as creatorName (1 ms)
        × includes duration and count on activities, from routine_activities join (1 ms)
      getAllPublicRoutines
        × selects and returns an array of all public routines, includes their activities (1 ms)
        × includes duration and count on activities, from routine_activities join
        ○ skipped includes username, from users join, aliased as creatorName
      getAllRoutinesByUser
        × selects and return an array of all routines made by user, includes their activities (1 ms)
        × includes username, from users join, aliased as creatorName
        × includes duration and count on activities, from routine_activities join (1 ms)
      getPublicRoutinesByUser
        × selects and returns an array of all routines made by user, includes their activities (1 ms)
        × includes username, from users join, aliased as creatorName (1 ms)
        × includes duration and count on activities, from routine_activities join
      getPublicRoutinesByActivity
        × selects and return an array of public routines which have a specific activityId in their routine_activities join, includes their activities (1 ms)
        × includes username, from users join, aliased as creatorName (1 ms)
        × includes duration and count on activities, from routine_activities join
      createRoutine
        × creates and returns the new routine (2 ms)
      updateRoutine
        × Returns the updated routine (1 ms)
        × Finds the routine with id equal to the passed in id. Does not update the routine id.
        × Updates the public status, name, or goal, as necessary
        × Does not update fields that are not passed in (1 ms)
      destroyRoutine
        × removes routine from database
        × Deletes all the routine_activities whose routine is the one being deleted. (1 ms)
    Routine Activities
      addActivityToRoutine({ routineId, activityId, count, duration })
        × creates a new routine_activity, and return it (1 ms)
      updateRoutineActivity({ id, count, duration })
        × Finds the routine with id equal to the passed in id. Updates the count or duration as necessary.
      destroyRoutineActivity(id)
        × remove routine_activity from database