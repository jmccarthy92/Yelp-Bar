
var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');
    //adding routes to router



// ROOT ROUTE
router.get("/",function(req,res){
    res.render("landing"); 
});





// ==============
// AUTH ROUTES
// =============

// SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render('register');
});

//HANDLE SIGN UP LOGIC
router.post('/register', function(req,res){
    if( req.body.password === req.body.password2)
    {
        var newUser = new User({username: req.body.username, email: req.body.email});
        //register does the dirty work to register the user int he db
        User.register(newUser, req.body.password, function(err,user){
            if(err) {
                return res.render("register",{"error": err.message});
            } 
            // local strategy
            // were doing other things before we passport.authenticate
            passport.authenticate("local")(req, res, function(){
                req.flash('success',"Welcome to YelpBar " + user.username)
                res.redirect('/barroom'); 
            });
       }); 
    }
    else {
        req.flash('error','Passwords did not match!');
        res.redirect('/register');
    }
});

//SHOW LOGIN FORM
router.get('/login', function(req,res){
    // references the error flash
    res.render('login');
})

//HANDLING LOGIN LOGIC
// (login,  middleware, callback)
router.post('/login', passport.authenticate('local',
    { 
        // where as this assumethey have an account already before they login
        successRedirect: '/barroom',
        failureRedirect: '/login',
        failureFlash: true
    }), function(req,res){
     
});

// LOGOUT ROUTE
router.get('/logout', function(req,res){
   req.logout();
   req.flash('success','Logged you out!');
   // we get logout comes fro mpackages we have installed
   res.redirect('/barroom');
});


module.exports = router;

