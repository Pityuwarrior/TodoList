require('dotenv').config()//Load the environment from the .env file

const express = require('express')//API
const cors = require('cors')
const app = express();
const PORT = 3000;
const pool = require("./src/utils/database")

app.use(express.static('dist'))

const corsOtions = {
  origin: 'http://localhost:1234',
  methods: "GET, POST, PUT, DELETE, PATCH",
  optionSuccessStatus: 200
}

app.use(cors(corsOtions))

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
    if(req.method === 'OPTIONS'){
      res.sendStatus(200);
    } else{
      next();
    }
  })
*/

app.use(express.json()) // Make the server accept json

//Sending the values to the router(middleware)
const todolistRouter = require('./src/routers/tasks')
app.use('/tasks', todolistRouter)

//Starting the server
app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`))