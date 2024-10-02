const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authMiddleware (req,res,next){
    const { token } = req.headers;
    try{
        
        const decodedData = await jwt.verify( token , process.env.JWT_SECRET );
        
        if(decodedData && decodedData.role === 'user' ){
            req.userId = decodedData.userId ;
            next();
        }
        else if(decodedData && decodedData.role === 'admin'){
            req.adminId = decodedData.adminId ;
            next();
        }
        else{
            res.json({message : "Incorrect Credentials / Insufficient Privileges"});
        }
    }
    catch(error){
        return res.json({message : "Invalid Token" , error : error})
    }
}
module.exports = {authMiddleware}