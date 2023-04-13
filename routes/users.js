const express=require('express');
 const router=express.Router();
const passport=require('passport')

const usersController=require('../controllers/users_Controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.sign_up);
router.get('/sign-in',usersController.sign_in);


router.post('/create',usersController.create);
// use passport as a middleware to authenticate

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.get('/sign-out',usersController.sign_out);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);


 module.exports=router;