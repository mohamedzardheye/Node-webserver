const express = require('express');
const hbs = require('hbs');
const fs = require('fs');




var app = express();
app.set('view engine', 'hbs');


// middle ware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}` ;
  console.log(log);
  fs.appendFile('server.log',log + '\n' ,(err) =>{
    if(err) {
      console.log('un able to appendFile to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+ '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
  });

hbs.registerHelper('screamIt', (text) =>{
return text.toUpperCase();
  });

app.get ('/', (req, res) =>{
  // res.send('<h1 style="text-align:center;">Hello express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Some Websites',
      pageBody: 'Welcome to my first NodeJs site',
  });
});

app.get ('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    name: 'mohamed',
    error: 'bad request'
  });
});

app.listen(3000, () =>{
  console.log('server is up to port 3000');
});
