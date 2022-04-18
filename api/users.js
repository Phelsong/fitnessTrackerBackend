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
  getUserByUsername,
  getAllRoutinesByUser
} = require("../db"); //assuming what we will be needing from users section of db
const {requireUser} = require("./helpers.js")
//----------------------------------------------------------------
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
    const _user = await getUserByUsername({username});
    if (_user) { return res.status(409).send({message:`user with name: ${username} already exists`}) }
    if (password.length < 8) { return res.status(411).send({message:`Password must be a minimum of 8 characters`})}
   
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

    res.status(200).send({ 
      user,
      token 
    });
    next()
  } catch ({ name, message }) {
    res.status(400).send
    next()
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




  try {
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
    const {rows : [user]} = await getUserByUsername({username});
    const token = jwt.sign({
      id: user.id,
      username: username
    }, process.env.JWT_SECRET);
    // const recoveredData = jwt.verify(token, process.env.JWT_SECRET)
    if (user && (user.password == password)) {

      res.status(200).send({
        message: "you're logged in!",
        token: token
      });
      next()
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    res.status(401).send(error);
}});
//----------------------------------------------------------------

    //   × sends back users data if valid token is supplied in header (9 ms)
    //   √ rejects requests with no valid token (8 ms)
usersRouter.get("/me", requireUser, async (req, res) => {
  try {
    res.send(req.user);
}catch (error) {res.status(511).send} 
});


//----------------------------------------------------------------

    //  × Gets a list of public routines for a particular user. (1 ms)
usersRouter.get("/:username/routines",  async (req, res) => {
  try{
  const {username : user} = req.params;
  const userRoutines = await getAllRoutinesByUser(user);
  res.status(200).send(userRoutines);
}
catch (error) {res.status(500).send(error)}
});








//----------------------------------------------------------------
module.exports = usersRouter;