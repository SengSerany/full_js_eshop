const router = require('express').Router();
let Item = require('./../models/Items');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

//index
router.get('/', (req, res) => {
    Item.find({}).then( items => {
        res.render('items/index', {items: items});
    })
});

//new
router.get('/items/new', (req, res) => {
    let item = new Item();
    res.render('items/new', {item: item});
});

//delete
router.get('/items/:id/remove', (req, res) => {
    Item.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/');
    })
});

//edit
router.get('/items/:id/edit', (req, res) => {
    Item.findById(req.params.id).then(item => {
        res.render('items/edit', {item: item});
    })
});

//update
router.post('/items/:id/update', [
    body('name')
                .trim()
                .escape()
                .isLength({ min: 3 }).withMessage('Le nom doit être renseigné et dois faire au moins 3 lettres.'),
    body('description')
                .trim()
                .escape(),
    body('price')
                .isNumeric()
                .withMessage('Le Le prix doit être un nombre.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        Item.findById(req.params.id).then(item => {
            res.render('items/edit', {item: item, errors: errors.array()});
        })
    }
    Item.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true }).then(item => {
        res.render('items/show', {item: item});
    })
});

//show
router.get('/items/:id', (req, res) => {
    Item.findById(req.params.id).then(item => {
        res.render('items/show', {item: item});
    })
});

//create
router.post('/items/:id', [
    body('name')
                .trim()
                .escape()
                .isLength({ min: 3 }).withMessage('Le nom doit être renseigné et dois faire au moins 3 lettres.'),
    body('description')
                .trim()
                .escape(),
    body('price')
                .isNumeric()
                .withMessage('Le Le prix doit être un nombre.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let item = new Item();
        return res.render('items/new', {item: item, errors: errors.array()});
    }
    Item.create({
        name: req.body.name.replace(/<[^>]*>?/gm,""),
        description: req.body.description.replace(/<[^>]*>?/gm,""),
        price: req.body.price
    }).then( item => {
        res.render('items/show', {item: item})
    })
});


module.exports = router;