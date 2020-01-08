const mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    picture: String
});

let Item = mongoose.model('Item', itemSchema);

module.exports = Item;