const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_Controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/users',require('./post'));

console.log('router is loaded');

module.exports=router;