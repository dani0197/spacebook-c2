const router = require('express').Router();
const Post = require('../models/postModel');

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


module.exports = router;