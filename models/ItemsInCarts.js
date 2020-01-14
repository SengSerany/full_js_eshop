const mongoose = require('mongoose');

let itemsInCartsSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    quantity: Number
})

let ItemsInCarts = mongoose.model('ItemsInCarts', itemsInCartsSchema)

module.exports = ItemsInCarts;