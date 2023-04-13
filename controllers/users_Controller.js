const User = require('../models/user');
// const fs   = require('fs');
const { readdirSync, rmSync } = require('fs');

const path = require('path');
module.exports.profile = async function (req, res) {
  try {
    console.log("User ID:", req.params.id);
    let userprofile = await User.findOne({ _id: req.params.id });
    // console.log(userprofile);
    if (userprofile) {
      return res.render('user_profile', {
        title: "User Profile",
        // user:userprofile
        profile_user: userprofile
      });
    }
    return res.redirect('/users/sign-in');


  } catch (err) {
    console.log("error in accessing the profile page", err);
  }
}

module.exports.update = async function (req, res) {

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) { console.log('**** multer error', err) }

        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {

          
          const dir = path.join(__dirname, '../uploads/users/avatars');
          user.avatar = User.avatarPath + '/' + req.file.filename;

          readdirSync(dir).forEach(f => {
            if(!user.avatar.includes(f)){
            rmSync(`${dir}/${f}`)
            }
          });
         
        }
        user.save();
        return res.redirect('back');
      })

    } catch (err) {
      req.flash('error', err);
      return res.redirect('back');
    }

  } else {
    req.flash('erroe', 'Unauthorized');
    res.status(401).send('Unauthorized');
  }
}
// try{
//   console.log('update',req.params.id);
//   if(req.user.id==req.params.id){
//     let user=await User.findByIdAndUpdate(req.params.id,req.body);
//     if(user){
//       console.log('update user',user);
//       return res.redirect('back');
//     }
//   }else {
//     res.status(401).send('Unauthorized');
//   }
// }catch(err){
//   console.log("error in udating the profile");
// }


// sign-out
module.exports.sign_out = async function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Sign out Successfully');
    res.redirect("/");
  });
}


// render the sign up page
module.exports.sign_up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile')
  }
    return res.render('user_sign_up.ejs', {
    title: "Codeial /sign up"
  });
}

// render the sign in page
module.exports.sign_in = function (req, res) {

  if (req.isAuthenticated()) {
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
      req.flash('success', 'sign up successfully');
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
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logging in Successfully');
  return res.redirect('/');
}
//  sign out 
module.exports.destroy = function (req, res) {
  res.logout();

  return res.redirect('/');
}

  // module.exports.destroySession=function(req,res){
  //   req.logout();
  //   req.flash('success','sign out successfully');
  //   return res.redirect('/');
  // }

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

