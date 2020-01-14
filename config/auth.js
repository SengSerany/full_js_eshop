module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Vous devez être connecter pour effectuer cette action.');
        res.redirect('/users/login');
    }
}