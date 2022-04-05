// build and export your unconnected client here
const { Client } = require("pg");
require("dotenv").config();
const LOGIN = process.env.DB_login;

//----------------------------------------------------------------
const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });

  async function getAllUsers(){
    const { rows } = await client.query(
      `SELECT id, username, password, name
      FROM users;
    `
    );
  
    return rows;
}







//----------------------------------------------------------------
module.exports = {client}