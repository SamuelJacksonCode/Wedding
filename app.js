const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejsMate = require('ejs-mate')
const engine = require('ejs-mate');
const flash = require('connect-flash');


const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const session = require('express-session')

const userRoutes = require('./routes/users');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'))

mongoose.connect('mongodb://127.0.0.1:27017/');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const sessionConfig = {
    secret: 'thisismysecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxage: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.urlencoded({ extended: true }));


app.use('/', userRoutes);

app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;

    next();
})


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/When', (req, res) => {
    res.render('When');
})

app.get('/registry', (req, res) => {
    res.render('registry');
})

app.get('/RSVP', (req, res) => {
    res.render('RSVP');
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})