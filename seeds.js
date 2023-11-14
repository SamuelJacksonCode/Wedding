const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://127.0.0.1:27017/wedding');

const u = new User ({

name: 'Sam',
email: 'samjackson1112@gmail.com',

})

u.save().then( u => {
    console.log(u)
})
.catch(e => {
    console.log(e)
})