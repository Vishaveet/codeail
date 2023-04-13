const { json } = require('express');
const User =require('../../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createSession =async function (req, res) {

    try{
        let user=await User.findOne({email:req.body.email});
        
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid user name or password"
            })
        }

        return res.json(200,{
            message:"Sign in successful and here is your token,plese keep safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        })


    }catch(err){
        return res.json(500,{
            message:"Internal Error"
        });
    }


  }
  