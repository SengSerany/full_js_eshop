const router = require('express').Router();
let Item = require('./../models/Items');

//index
router.get('/', (req, res) => {
    Item.find({}).then( items => {
        res.render('items/index', {items: items});
    })
});

//new

//create

//edit

//update

//delete

//show
router.get('/items/:id', (req, res) => {
    Item.findById(req.params.id).then(item => {
        res.render('items/show', {item: item});
    })
});


module.exports = router;