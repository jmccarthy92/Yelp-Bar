var mongoose = require('mongoose'),
    Barroom = require('./models/barroom'),
    Comment = require('./models/comment');
 
// an array of 3 seeded data objects which is what our 
// barroom model is expecting
var data = [
        {
            name: "Nevada Smiths", 
            img: "http://ontheinside.info/wp-content/authors/ben-chang/nevada-smiths02.jpg",
            description: "ou mean while I'm sleeping in it? Michelle, I don't regret this, but I both rue and lament it. Does anybody else feel jealous and aroused and worried? Does anybody else feel jealous and aroused and worried?"
        },
        {
            name: "Solace", 
            img: "http://www.ranchandcoast.com/wp-content/uploads/2015/01/Solace01.jpg",
            description: "Bender, I didn't know you liked cooking. That's so cute. You wouldn't. Ask anyway! The alien mothership is in orbit here. If we can hit that bullseye, the rest of the dominoes will fall like a house of cards. Checkmate."
            
        },
        {
            name: "The Olde Bar", 
            img: "https://farm8.staticflickr.com/7400/9681292390_d741b94b64.jpg",
            description: "Kif, I have mated with a woman. Inform the men. You can see how I lived before I met you. Shut up and get to the point! I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring."
            
        }
            
    ];
    
function iterData(){
    //add a ew barrooms
    // looping through our data and adding each barroom
    // in the array to add each one to the model
    data.forEach(function(seed){
        Barroom.create(seed, function(err, barroom){
            if(err){
                console.log(err);
            }
            else {
                console.log("Added a barroom!!");
                //create a comment
                Comment.create(
                    {
                        text: "I Love this place!",
                        author: "James" 
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        } else {
                            barroom.comments.push(comment);
                            barroom.save();
                            console.log("Created new comment");
                            
                        }
                        
                    });
            }
        })
    });
    
}
   
function seedDB(){

    // removes everythign from the database( swipes it clean ) 
    // we need to put the data.foreach in the callback becausee there is no
    // guarantee that the code will happen after remove finishes unless
    // we put it in the callback
    Barroom.remove({}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("barrooms removed!");
        iterData();
    }
     });

    //add a few comments

    
}

module.exports = seedDB;