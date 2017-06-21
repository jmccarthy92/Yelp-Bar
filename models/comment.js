var mongoose = require('mongoose');

// SCHEMA
var CommentSchema = new mongoose.Schema({
    text: String,
    // store data inside comment is what of the
    // exclusive features of Non-relationals db's
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            } ,
        username: String
    }
})


var Comment = mongoose.model("Comment",CommentSchema)
module.exports = Comment;