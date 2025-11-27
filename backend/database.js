// database.js
const { Pool } = require('pg');

// Use environment variables for secure, best practice configuration
const pool = new Pool({
  user: 'potluck',
  host: 'potluck-db.c50wm28ege2t.us-east-2.rds.amazonaws.com',
  database: 'potluck',
  password: 'potluck123',
  port: 5432,
  ssl: {
    rejectUnauthorized: false 
  }
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT * FROM public.users', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Database connected successfully:', result.rows[0]);
  });
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};