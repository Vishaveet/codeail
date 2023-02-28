const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_Controller');

router.get('/',homeController.home);
console.log('router is loaded');

module.exports=router;