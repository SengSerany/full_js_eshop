const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
let User = require('./../models/Users');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

router.get('/login', (req, res) => {
    res.render('users/login', { errors: undefined });
})

router.post('/login', passport.authenticate('local'), (req, res) => {

})

router.get('/register', (req, res) => {
    res.render('users/register', { errors: undefined });
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
    new Promise((resolve, reject) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/register', {errors: errors.array()});
        }

        User.findOne({ email: req.body.email}).then( user => {
        if (user){
            return res.render('users/register', { errors: [{ msg: "L'adresse email est déja utilisé."}]})
        }})
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
    
                if (user.save()){
                    req.flash('success_msg', 'Votre compte a bien été créé !')
                    resolve(res.redirect('/users/login'));
                } else {
                    reject(res.render('users/register', { errors: [{ msg: "Une erreur est survenue. Veillez reéssayer"}]}));
                }
            });
        });

    });
    

    
})

module.exports = router;