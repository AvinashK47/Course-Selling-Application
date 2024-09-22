const express =require('express');
require(('dotenv').config());
const app = express();
app.get("/",function(req,res){
    return res.send("Home Page");
})


app.listen(process.config.PORT);
