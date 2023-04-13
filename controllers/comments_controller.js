const Comment = require('../models/comment');
const Post = require('../models/post');
const commentmailer = require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email');
const queue=require('../config/kue');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        if (post) {
        // console.log(post,"post");
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user.id
            });
            if (comment) {
                post.comments.push(comment);
                post.save();

                // Similar for comments to fetch the user's id!
                await comment.populate('user','name email');

                // commentmailer.newComment(comment);
                let job=queueMicrotask.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in creating a queue',err);
                        return;
                    }
                    console.log('job enqueue',job.id);
                });

                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
                req.flash('success', 'Add comment successfully');
                res.redirect('/');
            }
        }


    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}
module.exports.destroy = async function (req, res) {

    try {

        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } })
            // send the comment id which was deleted back to the views
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Remove comment successfully');
            return res.redirect('back');
        } else {
            req.flash('error', 'you cannot delete this comment');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
    }
}