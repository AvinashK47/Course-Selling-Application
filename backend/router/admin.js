const express = require('express');
const adminRouter = express.Router();
const { courseModel, adminModel } = require('../database');
const { default: adminAuth } = require('../middlewares/adminAuth');

adminRouter.get('/',(req,res)=>{
    res.send("admin page");
})

adminRouter.post('/signup',async (req,res)=>{
    const {username,password} = req.body;
    const admin = await adminModel.findOne({username,password});
    if(admin){
        return res.json({message : "Administrator already exists"})
    }
    else{
        await adminModel.create({
            username : username,
            password : password
        });
    }
})
adminRouter.post('/login',async(req,res)=>{
    
})

adminRouter.post('/create',adminAuth,async(req,res)=>{

    const {title,description,price,content} = req.body;

    const course = await courseModel.create({
        title : title,
        description : description,
        price : price,
        content : content
    })
    if (course){
        res.json({message : "Course Created"})
    }
    else{
        res.json({message : "There was an error"})
    }
})

adminRouter.put('/delete',adminAuth,async (req,res)=>{
    const {title} = req.body;
    const deleteCourse = await courseModel.deleteOne({
        title : title
    })
    if(deleteCourse){
        res.json({
            title : title,
            message : "Course deleted"
        })
    }
    else{
        res.json({message :"there was an error"})
    }
})

module.exports = adminRouter;