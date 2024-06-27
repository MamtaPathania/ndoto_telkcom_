// var mysql2=require('mysql2')
// const dotenv=require('dotenv')
// dotenv.config()

// const pool = mysql2.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     })

// module.exports=pool;

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

const connection2 = mysql.createConnection({
  host: process.env.DB_HOST2,
  user: process.env.DB_USER2,
  password: process.env.DB_PASSWORD2,
  database: process.env.DB_NAME2,
});

connection2.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to second database!');
});

// const pool = mysql.createConnection({
//     host:process.env.DB_HOST,
//         user:process.env.DB_USER,
//         password:process.env.DB_PASSWORD,
//         database:process.env.DB_NAME,
//   });
  
//   pool.connect((err) => {
//     if (err) {
//       console.error('Error connecting to database:', err);
//       return;
//     }
//     console.log('Connected to second database!');
//   });


module.exports = { connection, connection2 };
