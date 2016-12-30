"use strict"
/* Requires */
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const expressSession=require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transport = nodemailer.createTransport((smtpTransport({
  host: "localhost",
  secureConnection: false, // use SSL
  port: 3000, // port for secure SMTP
  auth: {
    user: "krishanmarya1",
    pass: "!!"
  }
})));


/* Init */
const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('Run it');
const port = process.env.PORT || 3000;

const pathToStaticDir = path.resolve(__dirname, '..', 'public');

app.use(express.static(pathToStaticDir/*, {maxAge:"1d"}*/));


app.post('/message', (req, res) => {

	console.log("req.body", req.body);

  res.send('noted');
// 	transport.sendMail({  //email options
//    from: "Krishan Arya <krishanmarya1@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
//    to: "Krishan Arya <receiver@email.com>", // receiver
//    subject: "Emailing with nodemailer", // subject
//    text: req.body // body
// }, function(error, response){  //callback
//    if(error) {
//        console.log(error);
//    } else {
//        console.log("Message sent: " + response.message);
//    }
// });


});

//
app.get('*', (req, res) => {
  console.log('req.session', req.session);
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});



server.listen(port, () => {
  console.log('Listening on port', port);
});