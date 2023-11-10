const Guest = require('../models/guests');

module.exports.renderGuest = (req, res) => {
    res.render('views/rsvp');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredGuest = await User.register(user, password);
        req.login(registeredGuest, err => {
            if (err) return next(err);
            req.flash('success', 'You are now enrolled to be in our guest list!');
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('RSVP');
    }
}