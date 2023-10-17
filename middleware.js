const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'))

app.get('/', (req, res) => {
    res.send('Home page!');
})

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn =(req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login')
    }
    next();
}

