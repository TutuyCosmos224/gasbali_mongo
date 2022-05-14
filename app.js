const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const Connection = require('./connector/connection');
const Routes  = require('./routes/index.js');
require("dotenv").config();
const userService = require('./service/service.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', Routes.Routes());

//app
try{
    Connection.connectMongoose();
    app.listen(process.env.PORT, ()=>{
        console.log("application running...");
    })
} catch (err){
    throw err;
}


