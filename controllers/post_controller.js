const Post=require('../models/post');

module.exports.create=function(req,res){
   
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error is creating post',err);
            return ;
        }
        return res.redirect('back');
    })
}


// module.exports.create=async function(req,res){
//     try{
//       let post=await Post.create({
//             content:req.body.content,
//             user:req.user._id
//         })
//            return res.redirect('back');
//     }catch(err){
//         console.log('error is creating post ',err);
//     }
// }