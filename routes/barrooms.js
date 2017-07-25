var express = require('express'),
    router = express.Router(),
    Barroom = require('../models/barroom'),
    // inde name will let you call it autmatically without specifying the name index
    middleware = require('../middleware');
    //adding routes to router



// INDEX - shows us all barrooms
router.get("/",function(req,res){
    // console.log(req.user);
    // get all barrooms from DB than render the file
    Barroom.find({}, function(err, allBars){
        if(err){
            console.log(err);
        }
        else {
            res.render("barroom/index",{bars: allBars});
        }
    }); 
    
});

// one is a get and one is a post
// convention to have if one gets barrooms
// whhile barroom below posts them
// RESTFUL routes
// where we do the logic of makign a new campground

//CREATE - add new barroom to database
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to bars array
    //redirect back to barrom page
   var barName = req.body.name;
   var price = req.body.price;
   var barImg = req.body.img;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username:  req.user.username
   }
    var newBar = {name: barName, price: price, img: barImg, description: desc, author: author};
        // bars.push(newBar);
    //Create a new Bar and add it to the Database
    Barroom.create(newBar,function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
           //redirect back to barroom page
           res.redirect("/barroom");
        }
    })
   
});


// will show the form that will send the data to the barroom post route
// shows the form which submits a post a request is barroom as a get which will
// show us all campgroudns using the barroom template

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    // find barroom by id than send it through
  
    res.render("barroom/new");    
});

// order of routes is correct if we switch these two would
// pick up /new because :id because up anything

//SHOW - shows more info about one campground
router.get("/:id", function(req,res){
    //find the barroom with the provided id
    Barroom.findById(req.params.id).populate("comments").exec(function(err, foundBar){
       if(err){
           console.log(err);
       } else {
           //console.log(foundBar);
           // render show template with that barroom
           res.render("barroom/show", {bar: foundBar} );
       } 
    });
    // render show template with the campground;
});

// EDIT BARROOM ROUTE
router.get("/:id/edit", middleware.checkBarroomOwnership, function(req,res){
    // is user logged in?

    Barroom.findById(req.params.id, function(err, foundBarroom){
        if(err){
            req.flash('error',"Barroom doesn't exist!");
            res.redirect('back');
        } else {
            res.render('barroom/edit', {barroom: foundBarroom});  
        }
    });
} );

// UPDATE BARROOM ROUTE
router.put("/:id", middleware.checkBarroomOwnership, function(req,res){
    // find and update correct Barroom
    
    Barroom.findByIdAndUpdate(req.params.id, req.body.barroom, function(err, updatedBarroom){
        if(err) {
            res.redirect("/barroom");
        } else {
            res.redirect('/barroom/' + req.params.id );
        }
    } )
    //redirect somewhere
})


//DESTROY BARROOM ROUTE
router.delete("/:id", middleware.checkBarroomOwnership, function(req,res){
    Barroom.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/barroom');
        } else {
            res.redirect('/barroom');
        }
    })
});





// returning router
module.exports = router;