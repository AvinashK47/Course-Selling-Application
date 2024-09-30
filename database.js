const mongoose = require('mongoose')
require("dotenv").config()

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URL);
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
    },
    timestamps : true
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
})

const userModel = mongoose.model('User',userSchema);
const adminModel = mongoose.model('Admin',adminSchema);


module.exports = { userSchema , adminSchema , ConnectDB , userModel , adminModel }