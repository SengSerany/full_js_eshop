const router = require('express').Router();
let Item = require('./../models/Items');

router.get('/', (req, res) => {
    Item.find({}).then( items => {
        res.render('items/index', {items: items});
    })
})

module.exports = router;