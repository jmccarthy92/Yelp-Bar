var Barroom = require('../models/barroom'),
    Comment = require('../models/comment');

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkBarroomOwnership = function(req,res,next) {
                // is user logged in?
            if( req.isAuthenticated()) {
                
                Barroom.findById(req.params.id, function(err, foundBarroom){
                    if(err){
                        req.flash('error','Barroom not found');
                        res.redirect("back");
                    } else {
                        // does user own campground?
                        // foundBarroom is a mongoose object so we 
                        // need to use  .equals()
                        if( foundBarroom.author.id.equals(req.user._id)) {
                            next();  
                        } else {
                            req.flash('error',"You don't have the permission to do that");
                            res.redirect('back');
                        }
                        
                    }
                });
            } else {
                // take user to previous page they were on
                req.flash("error", "You need to be logged into access!");
                res.redirect('back');
            }
                
}


middlewareObj.checkCommentOwnership = function(req,res,next) {
        // is user logged in?
if( req.isAuthenticated()) {
        
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own comment?
                // foundBarroom is a mongoose object so we 
                // need to use  .equals()
                if( foundComment.author.id.equals(req.user._id)) {
                    req.flash('success',"Comment succesfully edited");
                    next();  
                } else {
                    req.flash('error',"You don't have permission to do that");
                    res.redirect('back');
                }
                
            }
        });
    } else {
        req.flash('error','You need to be logged into access');
        // take user to previous page they were on
        res.redirect('back');
    }
        
}


// MIDDLEWARE
// if user is logged in it will go to next
// and if not it'l lredirect o /login
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // success determines if message is gree n or red
    // req.flash sends the message under the key error
    req.flash("error", "You need to be logged into do that");
    res.redirect('/login');
}


module.exports = middlewareObj;