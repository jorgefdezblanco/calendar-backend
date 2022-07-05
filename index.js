const express = require('express');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//express server
const app = express();

//BD
dbConnection();

//cors
app.use(cors());

//public
app.use(express.static(path.join(__dirname, '/public')));

//parse body request
app.use(express.json());


//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//listen
app.listen(process.env.PORT,()=>{
    console.log(`servidor correndo en puerto ${ process.env.PORT }`);
});