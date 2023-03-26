const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_Controller');

router.get('/',homeController.home);

router.use('/users',require('./users'));

router.use('/posts',require('./post'));

module.exports=router;