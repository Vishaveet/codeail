const express=require('express');
const router=express.Router();
const postsController=require('../controllers/post_controller');
const passport=require('passport');

router.post('/create',passport.checkAuthentication,postsController.create);
// router.post('/create', function(req, res){   postsController.create });


module.exports=router; 