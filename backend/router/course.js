const express = require('express');
const courseRouter = express.Router();
const { authMiddleware, userAuthMiddleware } = require('../middlewares/authMiddleware');
const { courseModel, purchasedModel } = require('../database');

courseRouter.get('/',authMiddleware,userAuthMiddleware,(req,res)=>{
    return res.send("Course Page");
})

courseRouter.get('/all',authMiddleware,userAuthMiddleware,async(req,res)=>{
    try{
        const courses = await courseModel.find();
        return res.json(courses);
    }
    catch(err){
        console.log("Error fetching courses : ",err)
        return res.json("Internal Server Error");
    }
})

courseRouter.post('/purchase',authMiddleware,userAuthMiddleware,async(req,res)=>{
    
    const {courseId} = req.body;
    const userId = req.userId;
    const selectedCourse = await courseModel.findById(courseId);

    try {

        if(!selectedCourse){
            return res.json({message : "The Course you are requesting does not exist."});
        }

        const alreadyPurchased = await purchasedModel.findOne({userId,courseId});
    
        if(alreadyPurchased){
            return res.json({message : "Course Already Purchased"});
        }
    
        const newPurchase = await purchasedModel.create({
            userId : userId,
            courseId : courseId
        });
    
        if (newPurchase){
            return res.json({message : "Purchase Complete",Course : newPurchase});
        }
    }
    catch(error){
        console.log("Error during purchase  : ",error);
        return res.status(500).json({message  : "Internal Server Error."});
    }
})

courseRouter.get('/purchased',authMiddleware,userAuthMiddleware,async(req,res)=>{
    
    const userId = req.userId;
    const purchasedCourses = await purchasedModel.find({userId});

    try{
        if(purchasedCourses){
            return res.json({userId : userId,PurchasedCourses : purchasedCourses });
        }
        if(!purchasedCourses){
            return res.json({message : "No Courses purchased yet."});
        }
    }
    catch(error){
        console.log("Error fetching courses : ",error);
        return res.json({message:"Error Fetching Courses , Internal server error"});
    }

})

module.exports = courseRouter;