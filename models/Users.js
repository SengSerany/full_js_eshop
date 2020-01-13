const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

let User = mongoose.model('User', userSchema);

module.exports = User;