const mongoose = require('mongoose');
const Schema = mongoose.Schema

let commentSchema = new Schema({
    text: String,
    user: String
});

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment