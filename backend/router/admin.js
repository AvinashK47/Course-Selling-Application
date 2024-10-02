const express = require('express');
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { courseModel, adminModel } = require('../database');
const { authMiddleware } = require('../middlewares/authMiddleware');

adminRouter.get('/',(req,res)=>{
    res.send("admin page");
})

adminRouter.post('/signup',async (req,res)=>{
    const {username,password} = req.body;
    const existingAdmin = await adminModel.findOne({username});
    if(existingAdmin){
        return res.json({message : "Administrator already exists"})
    }
    else{
        await adminModel.create({
            username : username,
            password : password
        });
        return res.json({message : "New Administrator Created"});
    }
})
adminRouter.post('/login',async(req,res)=>{
    
    const {username , password} = req.body;
    
    const newAdmin = await adminModel.findOne({username});
    
    if(!newAdmin){
        return res.json({message : "Admin does not exist"});
    }

    const token = await jwt.sign({ adminId : newAdmin._id , role : "admin" },process.env.JWT_SECRET);
    return res.json({
        message : "Admin Signed In",
        token : token
    });
});

adminRouter.post('/create',authMiddleware,async(req,res)=>{

    const {title,description,price,content} = req.body;

    const course = await courseModel.create({
        title : title,
        description : description,
        price : price,
        content : content
    });
    if (course){
        res.json({message : "Course Created"});
    }
    else{
        res.json({message : "There was an error"});
    }
});

adminRouter.put('/delete',authMiddleware,async (req,res)=>{
    const {title} = req.body;
    const deleteCourse = await courseModel.deleteOne({
        title : title
    });
    if(deleteCourse){
        res.json({
            title : title,
            message : "Course deleted"
        });
    }
    else{
        res.json({message :"there was an error"});
    }
});

module.exports = adminRouter;