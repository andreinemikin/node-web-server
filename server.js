const express  = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to uppenf to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        message: 'Welcome sir',
        title: 'Home'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Projects'
    });
});

app.listen(port, () => {
    console.log('port run on: ' + port);
});
