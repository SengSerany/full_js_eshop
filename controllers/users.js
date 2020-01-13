const router = require('express').Router();
const passport = require('passport');
let User = require('./../models/Users');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local'), (req, res) => {

})

router.get('/register', (req, res) => {
    let errors = undefined;
    res.render('users/register', {errors: errors});
})

router.post('/register', [
    body('username')
                .trim()
                .escape()
                .isLength({ min: 3 }).withMessage('Le nom d\'utilisateur doit être renseigné et dois faire au moins 3 lettres.'),
    body('email')
                .trim()
                .escape()
                .isLength({ min: 1 }).withMessage('L\'Email n\a pas été renseigné.')
                .isEmail().withMessage('Ceci n\'est pas une adresse email valide'),
    body('password')
                .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.')
                .custom((value,{req, loc, path}) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error("Les mots de passe ne correspondent pas");
                    } else {
                        return value;
                    }
                })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/register', {errors: errors.array()});
    }

    const { username, email, password, confirmPassword } = req.body;
    User.findOne({ email: email}).then( user => {
        if (user){
            return res.render('users/register', { errors: ["L'email est déja utilisé."]})
        }
    })
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    }).then( user => {
        res.render('/')
    })

})

module.exports = router;