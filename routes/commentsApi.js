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
                { $push: {comments: newComment}},
                (err, newComment)=> {
                    if (err) {
                        console.error(err)
                        res.status(500).send(err)
                    } else {
                        res.send(newComment)
                    }
                }
            );
        }
    })
})

module.exports = router