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
async function getUser(username) {
  try {
    const {
      rows: [user]
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE username=$1;
    `, [username]);

    return user;
  } catch (error) {
    throw error;
  }
}
//----------------------------------------------------------------
async function getUserById(userId) {

  try {
    const {
      rows: [user]
    } = await client.query(`
    SELECT username
    FROM users
    WHERE id=${ userId };
    `)
    if (!user) {
      return null
    }

    // user.routines = await getRoutinesByUser(userId)

    return user

  } catch (error) {
    return null;
  }
}


//----------------------------------------------------------------
module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById
}