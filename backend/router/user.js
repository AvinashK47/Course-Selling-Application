const express = require('express');
const { userModel } = require('../database');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.send("User home page");
})

userRouter.post('/signup',async(req,res)=>{

    const { name , password , email } = req.body;

    try{
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({
                message : "User Already Exists"
            });
        }
        await userModel.create({
            name : name,
            password : password,
            email : email
        });
        return res.json({
            message  : "User Created Successfully"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Internal Server Error Occured"
        });
    }
});

userRouter.post('/login',async(req,res)=>{
    
    const {name,password,email} = req.body;

    const existingUser = await userModel.findOne({
        name : name,
        password : password,
        email : email
    });

    if(!existingUser){
        return res.json({
            message : "Sorry!!, User does not exist in our Database."
        });
    }
    const token = await jwt.sign( { userId : existingUser._id, role : 'user' } , process.env.JWT_SECRET );
    return res.json({
        message : "User Signed In",
        token : token
    });
})

module.exports = userRouter;