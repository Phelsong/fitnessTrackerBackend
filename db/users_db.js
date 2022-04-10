const {
  client
} = require('./client');
require("dotenv").config();

//----------------------------------------------------------------
async function createUser({
  username,
  password
}) {
  if (password.length < 8) {
    return error
  }

  try {
    const {
      rows: [user]
    } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
    `, [username, password]);
    return user;
  } catch (error) {
    throw error;
  }
}
//----------------------------------------------------------------
async function getAllUsers() {
  const {
    rows: allUsers
  } = await client.query(`
      SELECT id, username, name
      FROM users;
    `);

  return allUsers;
}
//----------------------------------------------------------------
async function getUser({username, password}) {
  try {
    const {
      rows: [me]
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE username=$1 AND password =$2;
    `, [username, password]);

    return me;
  } catch (error) {
    console.error('error getting ME')
    throw error;
  }
}
//----------------------------------------------------------------
async function getUserByUsername({username}) {
  try {
    const {
      rows: [me]
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE username=$1 
    `, [username]);

    return me;
  } catch (error) {
    console.error('error getting ME')
    throw error;
  }
}
//----------------------------------------------------------------
async function getUserById(userId) {

  try {
    const {
      rows: [user]
    } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
    `, [userId]);
    if (!user) {
      return null
    }

    // user.routines = await getRoutinesByUser(userId)

    return user

  } catch (error) {
    console.error('error getting User')
    return error;
  }
}


//----------------------------------------------------------------
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername
}