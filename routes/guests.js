const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Guest = require('../models/guests');
const users = require('../controllers/users')
const LocalStrategy = require('passport-local');
const guests = require('../controllers/guests')

router.use(passport.initialize());
router.use(passport.session());

router.route('/RSVP')
.get(guests.renderGuest)
.post(catchAsync(guests.guestList))

module.exports = router;