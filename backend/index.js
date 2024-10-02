const express = require('express');
require("dotenv").config();
const RootRouter  = require('./router/routes');
const { ConnectDB } = require('./database');

const app = express();

ConnectDB();

app.use('/',RootRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is running at PORT :",process.env.PORT)
});
