const express = require('express');
const adminRouter = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { courseModel } = require('../database');

adminRouter.get('/',(req,res)=>{
    res.send("admin page");
})

adminRouter.post('/signup',function(req,res){
    res.send("admin signup page");
})

adminRouter.post('/create',authMiddleware,async(req,res)=>{

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
    
adminRouter.put('/delete',authMiddleware,async (req,res)=>{
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