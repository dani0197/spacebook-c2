const mongoose = require('mongoose');
const Schema = mongoose.Schema

let commentSchema = new Schema({
    text: String,
    user: String
});

let comment = mongoose.model('comment', commentSchema);

module.exports = comment