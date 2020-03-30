# ccapdev-mongoose/views

This folder contains all hbs files to be rendered when requested from the server.

### Contents:
- [partials](https://github.com/arvention/ccapdev-mongoose/tree/master/views/partials) - This folder contains partial hbs code used by other hbs files.
- [error.hbs](https://github.com/arvention/ccapdev-mongoose/blob/master/views/error.hbs) - Error page displayed when the requested file is not in the server
- [index.hbs](https://github.com/arvention/ccapdev-mongoose/blob/master/views/index.hbs) - Index page displayed at the root of the web application
- [profile.hbs](https://github.com/arvention/ccapdev-mongoose/blob/master/views/profile.hbs) - Profile page which displays the details of the user such as first name, last name, and ID number. These details are extracted from the database and rendered using handlebars.
- [signup.hbs](https://github.com/arvention/ccapdev-mongoose/blob/master/views/signup.hbs) - Sign-up page which displays a form asking for the details of the user such as first name, last name, ID number, and password.
- [success.hbs](https://github.com/arvention/ccapdev-mongoose/blob/master/views/success.hbs) - Success page displayed after the user has successfully submitted the sign up form. This web page displays the name of the user and a link to the profile page of the user.
