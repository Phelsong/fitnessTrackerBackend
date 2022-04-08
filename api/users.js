// -------------- READ ME ----------------------------------------
/*
Currently Contains: Use, get all, register, login

*/
//----------------------------------------------------------------
const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
//----------------------------------------------------------------
const {
  createUser,
  getAllUsers,
  getUser,
  getRoutinesByUser
} = require("../db"); //assuming what we will be needing from users section of db
//----------------------------------------------------------------
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});
//---------------------------------------------------------------
usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  console.log("I AM RUNNING");
  console.log(users);
  res.send({
    users
  });
});
//----------------------------------------------------------------

    // × Creates a new user. (6 ms)
    // √ Requires username and password. Requires all passwords to be at least 8 characters long.
    // × EXTRA CREDIT: Hashes password before saving user to DB. (1 ms)
    // × Throws errors for duplicate username (8 ms)
    // × Throws errors for password-too-short. (1 ms)

usersRouter.post('/register', async (req, res, next) => { //***QUESTION ON PASSWORD REQUIREMENTS */
  const {
    username,
    password
  } = req.body;

  try {
    const _user = await getUser(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }
    const user = await createUser({
      username,
      password,
    });
    res.send({
      message: "thank you for signing up",
      token
    });
  } catch ({
    message
  }) {
    next({
      message
    })
  }
});

//----------------------------------------------------------------

    //    × Logs in the user. Requires username and password, and verifies that hashed login password matches the saved hashed password. (9 ms)
    //    × Returns a JSON Web Token. Stores the id and username in the token. (1 ms)

usersRouter.post('/login', async (req, res, next) => { // ***** QUESTION ON KEEPING ID AND USERNAME IN TOKEN*/
  const {
    username,
    password
  } = req.body;


  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);
    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, process.env.JWT_SECRET);
    const recoveredData = jwt.verify(token, process.env.JWT_SECRET)
    if (user && user.password == password) {

      res.send({
        message: "you're logged in!",
        token: token
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//----------------------------------------------------------------

    //   × sends back users data if valid token is supplied in header (9 ms)
    //   √ rejects requests with no valid token (8 ms)
usersRouter.get("/me", async (req, res) => {
  const myUser = await getUserByUsername();
  console.log(myUser);
  res.send({
    myUser
  });
});


//----------------------------------------------------------------

    //  × Gets a list of public routines for a particular user. (1 ms)
usersRouter.get("/:username/routines", async (req, res) => {
  const userRoutines = await getRoutinesByUser();
  console.log(userRoutines);
  res.send({
    userRoutines
  });
});








//----------------------------------------------------------------
module.exports = usersRouter;