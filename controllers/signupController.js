
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// defines an object which contains functions executed as callback
// when a client requests for `signup` paths in the server
const signupController = {

    // executed when the client sends an HTTP GET request `/signup`
    // as defined in `../routes/routes.js`
    getSignUp: function (req, res) {
        res.render('signup');
    },

    // executed when the client sends an HTTP POST request `/signup`
    // as defined in `../routes/routes.js`
    postSignUp: function (req, res) {

        // when submitting forms using HTTP POST method
        // the values in the input fields are stored in the req.body object
        // each <input> element is identified using its `name` attribute
        // Example: the value entered in <input type="text" name="fName">
        // can be retrieved using req.body.fName
        var fName = req.body.fName;
        var lName = req.body.lName;
        var idNum = req.body.idNum;
        var pw = req.body.pw;

        // calls the function insertOne()
        // defined in the `database` object in `../models/db.js`
        // this function adds a document to collection `users`
        db.insertOne(User, {
            fName: fName,
            lName: lName,
            idNum: idNum,
            pw: pw
        });

        // upon adding a user to the database,
        // redirects the client to `/success` using HTTP GET,
        // defined in `../routes/routes.js`
        // passing values using URL
        // which calls getSuccess() method defined in `./successController.js`
        res.redirect('/success?fName=' + fName +'&lName=' + lName + '&idNum=' + idNum);
    }

}

// exports the object `signupController` (defined above)
// when another script exports from this file
module.exports = signupController;
