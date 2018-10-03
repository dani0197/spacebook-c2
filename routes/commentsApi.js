const router = require('express').Router();
const comment = require('../models/commentModel');

router.post('/posts/:id/comments', function(req, res) {
    comment.create(req.body, function(err, data) {
        if(err) {
            console.error(err)
            res.status(500).send(err)
        } else {
            res.send(data)
            post.findByIdAndUpdate(id, {})
        }
    })
    let id = req.params.id;
})

module.exports = router