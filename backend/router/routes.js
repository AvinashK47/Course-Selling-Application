const express = require('express');
const userRouter = require('./user');
const adminRouter = require('./admin');
const courseRouter = require('./course');

const router = express.Router();

router.get('/home',(req,res)=>{
    res.send("Home Page");
})

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use('/courses',courseRouter);

module.exports = router ;