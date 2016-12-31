
/* Requires */
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const expressSession=require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
require("dotenv").config();
const transportString = `smtps://${process.env.MAIL_ADDRESS}%40gmail.com:${process.env.MAIL_PASS}@smtp.gmail.com`;
const transporter = nodemailer.createTransport(transportString);
console.log(transportString);

/* Init */
const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const pathToStaticDir = path.resolve(__dirname, '..', 'public');

app.use(express.static(pathToStaticDir/*, {maxAge:"1d"}*/));


app.post('/message', (req, res) => {

	console.log("req.body", req.body);

  var mailOptions = {
    from: '"Krishan Arya 👥" <dummyacct101390@gmail.com>', // sender address
    to: 'krishanmarya1@gmail.com', // list of receivers
    subject: 'Your app got a message!', // Subject line
    text: `${req.body.name}, with email ${req.body.email}, sent a message saying: ${req.body.message}`, // plaintext body
    html: `<b>${req.body.name}, with email ${req.body.email}, sent a message saying ${req.body.message}</b>` // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

  res.send('noted');
});

app.get('*', (req, res) => {
  console.log('req.session', req.session);
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});

server.listen(port, () => {
  console.log('Listening on port', port);
});
