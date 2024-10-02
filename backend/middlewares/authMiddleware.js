const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authMiddleware (req,res,next){
    const { token } = req.headers;
    const decodedData = await jwt.verify( token , process.env.JWT_SECRET );
    if(decodedData){
        req.userId = decodedData.userId ;
        next();
    }
    else{
        res.json({message : "Incorrect Credentials"});
    }
}
module.exports = {authMiddleware}