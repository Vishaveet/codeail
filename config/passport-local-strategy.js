const passport = require('passport');

const LocalStrategy = require('passport-local');

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
    async function (req,email, password, done) {
        // find the user and established identity
        let user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            req.flash('error','Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    }

))

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

// deserializing the user from key in the cookies

passport.deserializeUser(async function (id, done) {
   let user=await User.findById(id);

        return done(null, user);
    })

// check if user authenticated
passport.checkAuthentication=function(req,res,next){

    // if the user is sign in ,then pass on the request to the next function(controller's action) 
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not sign in
    return res.redirect('/users/sign-in'); 
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contain the current sign in user from the session cookie and we just sending this to the locals for the views 
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;

