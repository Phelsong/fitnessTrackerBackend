// build and export your unconnected client here
const { Client } = require("pg");
require("dotenv").config();


// activities/routines = activities/routines table ref
// activity/routines = routine_ activities table ref
//----------------------------------------------------------------
const client = new Client({connectionString: process.env.DATABASE_URL || `postgres://${LOGIN}@localhost:5432/fitness-dev`,
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined});

//----------------------------------------------------------------
module.exports = {client}