# Nodefolio
Welcome to my submission of Mandatory 2 in NodeJS

#### How to get going:

Run the following commands:

* npm install (to install all the dependencies)
* npm run setup (to set up enviroment and database)

You are now good to go.

#### Nodemailer

As I have no desire to share my private e-mail or create a new one, I have utilized etheral.email to randomly generate an e-mail with a password.

To get the nodemailer module to work, you need to go into nodemailer.js and change the auth: { user: 'x', pass: 'x' } to your own e-mail credentials

You also need to change the 'to: "x"' in the contactRoute.post function

It should now work with your own etheral generated e-mail
