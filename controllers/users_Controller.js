const User = require('../models/user');

module.exports.profile =async function(req, res) {
  try{
  
      let userprofile=await User.findOne({_id:req.user.id});
      console.log(userprofile,req.user);
      if(userprofile){
        return res.render('user_profile',{
          title:"User Profile",
          user:userprofile
        });
      }
      return res.redirect('/users/sign-in');
    

  }catch(err){
    console.log("error in accessing the profile page",err);
  }
}

// sign-out
module.exports.sign_out= async function(req,res){
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
} 


// render the sign up page
module.exports.sign_up = function (req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }

  return res.render('user_sign_up.ejs', {
    title: "Codeial /sign up"
  });
}

// render the sign in page
module.exports.sign_in = function (req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in.ejs', {
    title: "codeial/sign in"
  });
}

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);

      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }

  } catch (err) {
    console.log('inside catch user controller create method', err);
    return;
  }
}

// sign in and create a session for the user
  module.exports.createSession=function(req,res){
     return res.redirect('/');
  }


// module.exports.createSession = async function (req, res) {
//   try {
//     // step to authenticate
//     // find the user
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {

//       // handle password which don't match
//       if(user.password!=req.body.password){
//          return res.redirect('back');
//       }
//       // handle session creation 
//       res.cookie('user_id',user._id);
//       return res.redirect('/users/profile');

//     } else {
//       // handle user not found
//       res.redirect('back');
//     }

//   } catch (err) {
//     console.log('inside catch user controller createsession method', err);
//   }
// }

