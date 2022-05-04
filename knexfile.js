// Update with your config settings.
// require("dotenv").config()

import 'dotenv/config';
let connectionString = process.env.CONNECTION_STRING;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'postgres',
  connection: process.env.CONNECTION_STRING
};

export const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
export const production = {
  client: 'pg',
  connection: { connectionString, ssl: { rejectUnauthorized: false } },
  charset: 'utf8',  
  migrations: {
    directory: './migrations',
  }
};

