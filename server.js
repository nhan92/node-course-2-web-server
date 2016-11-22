const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  // console.log(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile(`server.log`, log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

 // app.use((req, res, next) => {
 //   res.render('maintenance.hbs');
 // });

 app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  // return 'test'
});


hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
res.render('home.hbs', {
  pageTitle: 'Home Page',
  wellcomeMessage: 'wellcome to my website',
  currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    paperTitle: 'Projects'
  });
});

// bad -send back json woth errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
