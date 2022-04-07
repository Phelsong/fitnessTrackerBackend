// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
require('dotenv').config()
const usersRouter = require("./users");
const activitiesRouter = require("./activities");
const routinesRouter = require("./routines");
const routine_activitiesRouter = require("./routine_activities");















module.exports = apiRouter