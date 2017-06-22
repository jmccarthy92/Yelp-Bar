var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Barroom = require("./models/barroom"),
    User = require('./models/user'),
    seedDB = require("./seeds"),
    Comment = require("./models/comment");

// REQUIRING ROUTES
var commentRoutes = require('./routes/comments'),
    barroomRoutes = require('./routes/barrooms'),
    indexRoutes   = require('./routes/index')

// connected to the yelp bar database
// mongoose.connect("mongodb://localhost/yelp_bar");
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://James:james@ds133922.mlab.com:33922/yelpbar");
// mongodb://<dbuser>:<dbpassword>@ds133922.mlab.com:33922/yelpbar
// console.log(process.env.DATABASEURL);  //refer to correct URL for given environment
//
// write ./mongod in the ~ directory to start mongoDB server

app.use(bodyParser.urlencoded({extended: true} ) );
app.set("view engine","ejs");
// dirname refers to the public directory that this script was run in
//__dirname is equal to workspace.yelpbars.v5
// tell express to serve the public directory
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use(flash());
//seed the database
// seedDB();

//PASSPORT CONFIGURATION
//  don't have to use cookie-parser or session because we  set up our app to use
// express-session 
app.use(require('express-session')({
    secret: "kieran_mccarthy",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//authenticate comes with passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// adds the currentUser: req.User send on every route without doing it manualls
//our own middleware
// DRY'S UP OUR CODE
// adds to all templates
app.use(function(req, res, next){
    //whatever we put in res.locals is what's available inside of our template
    // req.user will either be empty if nobodies signed in
    // or it will contain username and id  and email of the current user
    res.locals.currentUser = req.user;
    //WE NEED THE NEXT IN ORDER TO MOVE ON TO NEXT MIDDLEWARE
    res.locals.error = req.flash("error");
    res.locals.success = req.flash('success');
    next();
})

// tells our app to use those 3 route files we requires
app.use("/", indexRoutes);
//all routes shoudl start with /barroom
// appends /barroom in front of all routes
app.use("/barroom", barroomRoutes);
app.use("/barroom/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpBar Server has Started!");
});



















// code dumping grounds


// Barroom.create(
//     {
//         name: "Solace", 
//         img: "https://farm4.staticflickr.com/3273/3103934829_0f1bb9fb03.jpg",
//         description: " This place is alright for a couple of brews!"
        
//     }, function(err, barroom){
//       if(err){
//           console.log(err)
//       } 
//       else {
//           console.log('Newly creates BarRoom');
//           console.log(barroom);
//       }
//     });
    
// var bars = [
       
//         { name: "Central Bar" , image: "https://farm9.staticflickr.com/8593/16419929831_792a1a41ec.jpg"},
//         { name: "Solace", image: "https://farm4.staticflickr.com/3273/3103934829_0f1bb9fb03.jpg"},
//         { name: "Nevada Smiths", image: "https://farm8.staticflickr.com/7303/16235516979_01b6db9366.jpg"},
//         { name: "Central Bar" , image: "https://farm9.staticflickr.com/8593/16419929831_792a1a41ec.jpg"},
//         { name: "Nevada Smiths", image: "https://farm8.staticflickr.com/7303/16235516979_01b6db9366.jpg"},
//         { name: "Central Bar" , image: "https://farm9.staticflickr.com/8593/16419929831_792a1a41ec.jpg"}
//           ];
