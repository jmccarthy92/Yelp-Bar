var express = require('express'),
// merge params from baroom and comments together so inside comment routes
//we can access :id that's defined
// this way we can do the req.params.id
    router = express.Router({mergeParams: true}),
    Barroom = require('../models/barroom'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');
    //adding routes to router


//Commments NEW
router.get("/new", middleware.isLoggedIn,  function(req,res){
    Barroom.findById(req.params.id, function(err, bar){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {barroom: bar});
        }
    });

});

//Comments Create
// isLoggedIn middleware to protect and prevent any post requests
// if user is not logged in
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup the barroom using ID
    Barroom.findById(req.params.id, function(err, bar){
       if(err) {
           console.log(err);
           res.redirect("/barroom");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   req.flash('error','Something went wrong!');
                   console.log(err);
               } else {
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   //save comment
                   bar.comments.push(comment);
                   bar.save();
                   req.flash('success','Sucessfully added comment');    
                   res.redirect("/barroom/" + bar._id );
                   
               }
           });
           
       }
    });
    // create new comments
    // connect new comments to barroom
    // redirect to barrroom showpage
});


// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    // refers to barroom id
    Comment.findById(req.params.comment_id, function(err, foundComments){
        if(err) {
            res.redirect('back');
        } else {
            res.render("comments/edit",{barroom_id: req.params.id, comment: foundComments})     
        }
    })
   
});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/barroom/' + req.params.id);
        }
    });
});

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success',"Comment <strong>DELETED</strong>");
            res.redirect('/barroom/' + req.params.id);
        }
    })
})




module.exports = router;