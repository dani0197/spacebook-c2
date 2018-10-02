const mongoose = require('mongoose');
const Schema = mongoose.Schema
//design the two schema below and use sub docs 
//to define the relationship between posts and comments
let postSchema = new Schema({
    text: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

let Post = mongoose.model('post', postSchema);

module.exports = Post