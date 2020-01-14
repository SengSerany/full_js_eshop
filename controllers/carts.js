const router = require('express').Router();
const Cart = require("./../models/Carts");
const { ensureAuthenticated } = require('./../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    Cart.findOne({ user: req.user._id }).then( cart => {
        res.render('carts/show', {cart: cart, user: req.user});
    });
})

module.exports = router;