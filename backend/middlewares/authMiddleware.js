const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authMiddleware (req,res,next){
    const { token } = req.headers;
    try{
        
        const decodedData = await jwt.verify( token , process.env.JWT_SECRET );
        
        req.decodedData = decodedData;

        next();
    }
    catch(error){
        return res.json({message : "Invalid Token" , error : error})
    }
}

function adminAuthMiddleware(req,res,next){
    const decodedData = req.decodedData;
    try{
        if(decodedData && decodedData.role === 'admin'){
            req.adminId = decodedData.adminId ;
            next();
        } 
        else {
            return res.status(403).json({ message: "Forbidden: Admin access only" });
        }
    }
    catch(err){
        return res.json({error:err});
    }
}

function userAuthMiddleware(req,res,next){
    const decodedData = req.decodedData;
    try{
        if(decodedData && decodedData.role === 'user' ){
            req.userId = decodedData.userId ;
            next();
        }
        else {
            return res.status(403).json({ message: "Forbidden: User access only" });
        }
    }
    catch(err){
        return res.json({error:err});
    }
}

module.exports = {authMiddleware , adminAuthMiddleware , userAuthMiddleware }