const express = require("express");
const usersRouter = express.Router();
const { createInitialUsers, getAllUsers, getUserByUsername} = require("../db"); //assuming what we will be needing from users section of db
const jwt = require('jsonwebtoken');

require('dotenv').config()

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
  
    next();
  });
  usersRouter.get("/", async (req, res) => {
    const users = await getAllUsers();
    console.log("I AM RUNNING");
    console.log(users);
    res.send({users});
  });
  usersRouter.post('/register', async (req, res, next) => { //***QUESTION ON PASSWORD REQUIREMENTS */
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
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
    } catch ({ message }) {
      next({ message })
    } 
  });
  usersRouter.post('/login', async (req, res, next) => { // ***** QUESTION ON KEEPING ID AND USERNAME IN TOKEN*/
    const { username, password } = req.body;
  
    
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      const recoveredData = jwt.verify(token, process.env.JWT_SECRET)
      if (user && user.password == password) {
      
        res.send({ message: "you're logged in!", token: token });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });











module.exports = usersRouter;