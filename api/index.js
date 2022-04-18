// -------------- READ ME ----------------------------------------
/*


*/
//----------------------------------------------------------------
const express = require("express");
const apiRouter = express.Router();
require('dotenv').config()
const usersRouter = require("./users");
const activitiesRouter = require("./activities");
const routinesRouter = require("./routines");
const routine_activitiesRouter = require("./routine_activities");
const {requireUser} = require ("./helpers.js")
const {
  getUserById
} = require("../db/")
//----------------------------------------------------------------
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = process.env
//----------------------------------------------------------------

apiRouter.use('/health', function (req, res, next) {
  res.status(100).send({
    message: "Server is running"
  })
  next()
})
//----------------------------------------------------------------
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const {
        id
      } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({
      name,
      message
    }) {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});
//----------------------------------------------------------------
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});
//-------------------------------------------
apiRouter.use('/users', usersRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);
apiRouter.use('/routines_activities', routine_activitiesRouter);
//----------------------------------------------------------------
//.. Error Handler
apiRouter.use((error, req, res, next) => {
  res.status(500).send({
    name: error.name,
    message: error.message
  });
});












//-------------------------------------------------------------------
module.exports = apiRouter;