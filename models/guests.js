const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const GuestSchema = new Schema ({

    firstName: {
type: String,
required: true,
unique: true
    },

    lastName: {
        type: String,
        required: true,
        unique: true
            },

    email: {
        type: String,
        required: true,
        unique: true
    }
});

GuestSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Guest', GuestSchema);