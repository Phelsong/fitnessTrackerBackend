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
  getUserByUsername,
  getAllRoutinesByUser
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
  if (password.length < 8) { return res.status(401).send("Password is too short")}
  try {
    const _user = await getUser(username);
    if (_user) {
      res.send(error)
      next();
    }
   
    const user = await createUser({
      username,
      password,
    });
  
    const token = jwt.sign({ 
      id: user.id, 
      username
    }, process.env.JWT_SECRET, {
      expiresIn: '1w'
    });

    res.send({ 
      message: "thank you for signing up",
      token 
    });
  } catch ({ name, message }) {
    next({ name, message })
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
      username: username
    }, process.env.JWT_SECRET);
    const recoveredData = jwt.verify(token, process.env.JWT_SECRET)
    if (user && (user.password == password)) {

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
  const {username : user} = req.body;
  try {
  const {id, username} = await getUserByUsername(user);
  res.send({
    id, username
  });
}catch (error) {res.status(500).send} 



});


//----------------------------------------------------------------

    //  × Gets a list of public routines for a particular user. (1 ms)
usersRouter.get("/:username/routines", async (req, res) => {
  const {username : user} = req.body;
  const userRoutines = await getAllRoutinesByUser(user);
  console.log(userRoutines);
  res.send({
    userRoutines
  });
});








//----------------------------------------------------------------
module.exports = usersRouter;