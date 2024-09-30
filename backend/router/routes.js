const express = require('express')
const router = express.Router();
const userRouter = require('./user')
const adminRouter = require('./admin')

router.get('/home',(req,res)=>{
    res.send("Home Page");
})

router.get('/user',userRouter);

router.get('/admin',adminRouter)

module.exports = router , {userRouter , adminRouter}