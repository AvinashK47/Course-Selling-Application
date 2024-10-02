const express = require('express');
const courseRouter = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { courseModel } = require('../database');

courseRouter.get('/',(req,res)=>{
    res.send("Course Page (auth for admin)")
})

courseRouter.get('/all',authMiddleware,async(req,res)=>{

    res.send("all the courses");
})

courseRouter.get('/purchased',authMiddleware,(req,res)=>{
    res.send("purchased courses");
})

module.exports = courseRouter;