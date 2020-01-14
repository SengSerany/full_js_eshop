const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    update_at: {
        type: Date,
        default: Date.now
    },
    command_nb: {
        type: Number,
        default: 1
    }
})

let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
