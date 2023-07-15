# ccapdev-mongoose
Mongoose Tutorial for CCAPDEV1920T2

This repository will help you integrate Mongoose to your web applications. This web application has two main features - a sign up feature and a profile feature. Upon signing-up, registered users may view their profile.

## Contents:

Each folder and file in this repository is properly documented. You may read the `README.md` file of each folder to understand its content. You may also read the inline comments of each file explaining the statements line-per-line.

- [controllers](https://github.com/arvention/ccapdev-mongoose/tree/master/controllers) - This folder contains files which defines callback functions for client requests.
- [models](https://github.com/arvention/ccapdev-mongoose/tree/master/models) - This folder contains files for database modeling and access.
- [public](https://github.com/arvention/ccapdev-mongoose/tree/master/public) - This folder contains static assets such as css, js, and image files.
- [routes](https://github.com/arvention/ccapdev-mongoose/tree/master/routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [views](https://github.com/arvention/ccapdev-mongoose/tree/master/views) - This folder contains all hbs files to be rendered when requested from the server.
- [index.js](https://github.com/arvention/ccapdev-mongoose/blob/master/index.js) - The main entry point of the web application.

## Follow the steps below to set-up and study this repository:
1. Clone the repository either by downloading the contents of the repository [here](https://github.com/arvention/ccapdev-mongoose/archive/master.zip), or using the command below (Note: git should be installed in your system for this to work).
```
git clone https://github.com/arvention/ccapdev-mongoose
```
2. Open Command Prompt
3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.
4. Run the command `npm install` to initialize and install all necessary modules used in the project.

5. We may now run our server. To do this, we run the command `node index.js`. Upon running the command, your Command Prompt should display the following statement:
```
app listening at port 9090
Connected to: mongodb://localhost:27017/ccapdev-mongoose
```

6. Let's test our web application. Go to the link below to access the web application:
```
http://localhost:9090/
```

Your web browser should display the screen below:
![alt text](https://github.com/arvention/ccapdev-mongoose/blob/master/index.png "Index Page")

7. Go to the sign-up page either using the menu item or the button. Enter sample user details. In this web application, we will use the ID number as a key - thus it should be unique for each user. However, as of now, we have not yet implemented it. This will be implemented using AJAX in the next tutorial. There are no form validations as of now, except that it checks if all fields have been properly filled out.

The picture below displays a properly filled form:
![alt text](https://github.com/arvention/ccapdev-mongoose/blob/master/signup.png "Sign-up Page")

8. Review the file [`views/signup.hbs`](https://github.com/arvention/ccapdev-mongoose/blob/master/views/signup.hbs), focus on the `<form>` element, and take note of its elements and their attributes. Shown below is the `<form>` as excerpted from the file:

```
<form id="signup" method="post">
    <input type="text" name="fName" id="fName" class="field" placeholder="First Name" required> <br>
    <input type="text" name="lName" id="lName" class="field" placeholder="Last Name" required> <br>
    <input type="number" name="idNum" id="idNum" class="field" placeholder="Id Number" required> <br>
    <input type="password" name="pw" id="pw" class="field" placeholder="Password"> <br>
    <input type="submit" id="submit" value="SUBMIT">
</form>
```

Upon clicking the submit button, the client sends an HTTP POST request to the server. We set this by setting the attribute `method` of the element `form` to `post`. Using HTTP POST method, the client will send the values, identified through their corresponding value for the `name` attribute, entered by the user through the body of the request.

Check the file [`routes/routes.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/routes/routes.js). Shown below is a line as excerpted from the file:

```
app.post('/signup', signupController.postSignUp);
```

When the server receives an HTTP POST request for the path `/signup`, it executes the function `postSignUp()`. Check the file [`controllers/signUpController.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/controllers/signUpController.js) and focus on the function `postSignUp()`. Shown below is the function as excerpted from the file:

```
postSignUp: async function (req, res) {

    var fName = req.body.fName;
    var lName = req.body.lName;
    var idNum = req.body.idNum;
    var pw = req.body.pw;

    var user = {
        fName: fName,
        lName: lName,
        idNum: idNum,
        pw: pw
    }

    var response = await db.insertOne(User, user);

    if(response != null){
        res.redirect('/success?fName=' + fName +'&lName=' + lName + '&idNum=' + idNum);
    }
    else {
        res.render('error');
    }
}
```

To get the values sent to us by the client through body of the request object, we have to get it through the `req.body` object. The `name` of a specific form element, as we have discussed earlier, is used to identify a specific value sent through the request body. Thus to get the value of the `<input>` element whose `name` value is equal to `fName`, we can access it through `req.body.fName`.

We then insert the values entered by the user to our database using the `insertOne()` function defined in [`models/db.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/models/db.js).

The last line in the excerpted code of [`controllers/signUpController.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/controllers/signUpController.js) redirects us to send an HTTP GET request to path `/success`. The code below excerpts a line from [`routes/routes.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/routes/routes.js) which describes the function call given a client sends an HTTP GET request for path `/success`.

```
app.get('/success', successController.getSuccess);
```

When the server receives an HTTP GET request for the path `/success`, it executes the function `getSuccess()`. Check the file [`controllers/successController.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/controllers/successController.js) and focus on the function `getSuccess()`. Shown below is the function as excerpted from the file:

```
getSuccess: function (req, res) {

    var details = {
        fName: req.query.fName,
        lName: req.query.lName,
        idNum: req.query.idNum
    };

    res.render('success', details);
}
```

To get the values sent to us by the client through the query string of the URL, we have to get it through the `req.query` object. Following the values that we have entered in the form, the last line of the `postSignUp()` function of [`controllers/signUpController.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/controllers/signUpController.js) sent this query string:

```
/success?fName=Ned&lName=Stark&idNum=11312345
```

In this query string, we have 3 fields with their corresponding values. In the query string, pairs of string are placed after the `?` and separated by `&`. Each pair is defined as `field=value`. To get a specific value in the query string, as defined in the `getSuccess()` function in [`controllers/successController.js`](https://github.com/arvention/ccapdev-mongoose/blob/master/controllers/successController.js) shown above, we can access them through the `req.query` object. For example, we can access the value of the field `fName` by `req.query.fName`.

The web application should display the success screen. This screen displays a welcome message - displaying the first name, the last name, and a link to the profile of the registered user.

The picture below displays the success screen for the details that we have entered earlier:
![alt text](https://github.com/arvention/ccapdev-mongoose/blob/master/success.png "Success Page")

If you have entered the same sample details, the URL displayed by your web browser should be:
```
http://localhost:9090/success?fName=Ned&lName=Stark&idNum=11312345
```
9. Click the link to your profile.

The picture below displays the profile screen of the user which we have registered earlier:
![alt text](https://github.com/arvention/ccapdev-mongoose/blob/master/profile.png "Success Page")

10. Read the rest of the documentation in the `README.md` files in each folder and in the in-line comments in each file. Try registering various users and access their profiles by typing their URL :sunglasses:
