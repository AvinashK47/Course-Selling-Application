const express = require('express');
const courseRouter = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { courseModel } = require('../database');

courseRouter.get('/',authMiddleware,(req,res)=>{
    return res.send("Course Page");
})

courseRouter.get('/all',authMiddleware,async(req,res)=>{
    try{
        const courses = await courseModel.find();
        return res.json({courses});
    }
    catch(err){
        console.log("Error fetching courses : ",err)
        return res.json("Internal Server Error");
    }
})

courseRouter.post('/purchase',async(req,res)=>{
    
    const {courseId} = req.body;
    const selectedCourse = await courseModel.findOne();
    
    if(!selectedCourse){
        return res.json({message : "The Course you are requesting does not exist."});
    }



    return res.json({message : "purchase complete"})
})

courseRouter.get('/purchased',authMiddleware,(req,res)=>{
    res.send("purchased courses");
})

module.exports = courseRouter;