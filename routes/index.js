var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/gratitude', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var gratitudeSchema = mongoose.Schema({ //Defines the Schema for this database
    Image: String,
    Caption: String,
    Votes: {type: Number, default: 0},
});

gratitudeSchema.methods.upvote = function(cb) {
  this.Votes += 1;
  this.save(cb);
};

var Post = mongoose.model('Post', gratitudeSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);
    var newcomment = new Post(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log("POST" + post);
        res.sendStatus(200);
    });
});


/* GET specific comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    var requestName = req.query["q"];
    var obj = {};
    console.log(requestName);
    if(requestName){
        obj = { Name : requestName };
    }
    Post.find(obj, function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList); //Otherwise console log the comments you found
            res.json(commentList); 
        }
    })
});

//Trying to update the upvotes
router.param('like', function(req, res, next, id) { //param = syntax to create a helper function called 'comment'
  Post.findById(id, function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

router.put('/comment/:like/upvote', function(req, res, next) { //put edits something that's already there
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.post('/delete', function(req, res, next) {
    console.log("in delete route");
    Post.deleteMany({}, function(err, result){
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    })
});



module.exports = router;
