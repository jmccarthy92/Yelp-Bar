var mongoose = require('mongoose');
//SCHEMA Setup easy an flexible
var BarroomSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    description: String,
    author : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    //associations an array of comments
    comments: [
            {
                //object references 
                type: mongoose.Schema.Types.ObjectId,
                //references the Comment model / collection
                ref: "Comment"
            }        
        ]
});

// Compiling Schema into a model
// so we can use all mongoDB methods
var Barroom = mongoose.model("Barroom", BarroomSchema);
module.exports = Barroom;
