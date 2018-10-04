const router = require('express').Router();
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

router.post('/posts/:id/comments', function (req, res) {
    Comment.create(req.body, function (err, newComment) {
        if (err) {
            console.error(err)
            res.status(500).send(err)
        } else {
            let id = req.params.id;
            Post.update(
                { _id: id },
                { $push: { comments: newComment } },
                (err, newComment) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send(err)
                    } else {
                        Post.find({}).populate('comments').exec((err, data) => {
                            res.send(data)
                        })
                    }
                }
            );
        }
    })
})

router.delete('/posts/:id/comments/:commentId', function (req, res) {
    let postId = req.params.id;
    const commentId = req.params.commentId;
    Comment.findByIdAndRemove(commentId, function (err) {
        if (err) {
            console.error(err)
            res.status(500).send(err)
        } else {
            Post.update(
                { _id: postId },
                { $pull: { comments: commentId } },
                (err) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send(err)
                    } else {
                        Post.find({}).populate('comments').exec((err, data) => {
                            res.send(data)
                        })
                    }
                }
            )
        }
    })
})

module.exports = router