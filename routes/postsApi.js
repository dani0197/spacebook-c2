const router = require('express').Router();
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

router.get('/posts', function(req, res) {
    Post.find({}).populate('comments').exec( function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/posts', function(req, res) {
    Post.create(req.body, function(err, data) {
        if(err) {
            console.error(err)
            res.status(500).send(err) 
            } else {
            res.send(data)
        }
    })
})

router.delete('/posts/:id',function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err, data) {
        if(err) {
            console.error(err)
            res.status(500).send(err)
        } else {
            res.send(data)
        }
    })
})

router.post('/posts/:id', function(req, res) {
    Comment.create(req.body, function(err, data) {
        if(err) {
            console.error(err)
            res.status(500).send(err)
        } else {
            res.send(data)
        }
    })
    let id = req.params.id;
})

module.exports = router;