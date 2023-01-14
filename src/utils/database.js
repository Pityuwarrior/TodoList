const mysql = require('mysql')//Database

//Creating the mysqldb
const pool = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
}) 

//Connection test
pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
});

module.exports = pool;