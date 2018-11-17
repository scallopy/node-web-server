const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// making new express app
var app = express();

// set support from partials
hbs.registerPartials(__dirname + '/views/partials');

//set view engine
app.set('view engine', 'hbs');

// Use middleware
app.use((req, res, next) => {
  var now = Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to file server.log');
    };
  });
  next();
});

// // Make maintais.hbs file
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// view static basic help page
app.use(express.static(__dirname + '/public'));

// registerHelper
  //for currentYear
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

  //for text toUpperCase()
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// setting app all of a HTTP handlers examples
  // Content-Type: text/html: charset=utf-8
// app.get('/', (req,res) => {
//   res.send('Hello Express');
// });
app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website!',
  });
});

// Render about.hbs
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

  // Create new page
  // Content-Type: text/html: charset=utf-8
app.get('/html', (req, res) => {
  res.send('<h1>Hello Express</h1>');
});

 // Content-Type: application/json; charset=utf-8
app.get('/json', (req,res) => {
  res.send({
    name: 'Petya',
    likes: [
      'Biking',
      'Cities'
    ]
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// Listening server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
