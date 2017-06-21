#YelpBars

* Add Landing Page
* Add Main Yelp Bar page that lists all bars

#Each Bar has:
* Name
* Image


#Layout and basic styling
* create our header and footer partials
* add in bootstrap!


#Creating New Bars
* Setup new bar POST route
* Add in body-parser
* setup route to show form
* add basic unstyled form


#Style the barroom page
*add a better header/title
*make barrroom display in a grid


#Style the Navbar and Form
* Add a navbar to all templates
* Style the new barroom form


#Add Mongoose
* Install and configure mongoose
* Setup barroom model
* Use barroom model inside of our  routes!

#Show Page
* Review the RESTFUL routes  we've seen so far
* Add description to our barroom model
* ahow db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Usse module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds everytime the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on barroom showpage!

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display commments nicely

##Finish Styling Show Page
* Add public directory
* Add Custom Stylesheet

##Auth pt 1 - Add User Model
* Install all packages needed for uath
* Define User Model

##Auth pt 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add Login routes
* Add loging templates

##Auth Pt. 4 - Logout/ Navbar
* Add logout route
* Prevent User from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

##Refactor The Routes
* Use Express router to reorganize all routes

##Users + Comments
* Associate User and comments
* Save author's name to a comment automatically


##Users + Barrooms
* Prevent an unauthenticated user from creating a barroom
* Save username + id to newly created barroom

# Editing Barrooms
* Add MEthod-Override
* Add Edit Route for Campgrounds
* Add link to dit page
* Add update route
* fix $set problem

#Deleting Barrooms
* Add Destroy Route
* Add Delete Button

#Authorization Part 1: Barrooms
* User can only edit his/her barrooms
* User can only delete his/her barrooms
* Hode/Show edit and delete Buttons

#Editing Comments
* Add Edit route for comments
* Add Edit Button
* Add Update routes

#Deleting Comments
* Add Destroy route
* Add Delete Button

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

#Designing and refactoring the Landing Page
* Do that

#Dynamic Price Feature - Yelp Camp
* Add price to campground model as a String datatype
* Add price to views/campgrounds/new.ejs and views/campgrounds/edit.ejs (new and edit forms)
* Add price to views/camprounds/show.ejs (campground show page)


RESTFUL ROUTES
name     url        verb    description
=================================================
INDEX   /dogs       GET    Display a list of all dogs
NEW     /dogs/new   GET    Displays a form to make a dogs
CREATE  /dogs       POST   Add new dog to DB
SHOW    /dogs/:id   GET    Shows info about one dog

INDEX   /barroom
NEW     /barroom/new
CREATE  /barroom
SHOW    /barroom/:id

* Nested Route
    * Because comments are associated with baroomss
    * we need a find by id from barrom
    
NEW     barroom/:id/comments/new    GET
CREATE  barroom/:id/comments        POST
