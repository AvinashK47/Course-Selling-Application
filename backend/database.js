const mongoose = require('mongoose');

require("dotenv").config()

async function ConnectDB(){
    
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!!")
    }
    catch(err){
        console.log("Mongoose Connection Error : ",err);
    }
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    password : {
        type : String,
        min : 4,
        require : true
    },
    email : {
        type : String,
        require : true
    }
});

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true,
        min : 6 ,
        max : 16
    }
});

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        min : 6,
        require : true
    },
    description : {
        type : String,
        min : 20,
        require : true
    },
    price : {
        type : Number,
        require : true
    }
});

const purchasedCourseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , ref : 'User', required : true
    },
    courseId : {
        type : mongoose.Schema.Types.ObjectId , ref : 'Course', required : true
    }
});

const userModel = mongoose.model('User',userSchema);
const adminModel = mongoose.model('Admin',adminSchema);
const courseModel = mongoose.model('Course',courseSchema);
const purchasedModel = mongoose.model('PurchasedCourse',purchasedCourseSchema);

module.exports = {
    userSchema,
    adminSchema,
    courseSchema,
    purchasedCourseSchema,
    ConnectDB,
    userModel,
    adminModel,
    courseModel,
    purchasedModel
}