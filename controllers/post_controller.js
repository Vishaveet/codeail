const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if(req.xhr){
          await post.populate('user');
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            })
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string 

        if (post.user == req.user.id) {
            post.remove();
            let comments = await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"deleted post"
                })
            }


            req.flash('success', 'Post and comment is delete successfully');

            return res.redirect('back');
        } else {
            req.flash('erroe', 'You can not delete the Post');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('erroe', err);
        return res.redirect('back');
    }

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