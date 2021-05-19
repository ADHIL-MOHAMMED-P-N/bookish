module.exports = {
    //protecting the /home,cant go to /home without login
    verifyAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/"); //protecting the /home
        }
    },
    //make sure logged in user wont see login page (protecting from goinng back to '/')
    verifyGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/home");
        } else {
            return next();
        }
    },
};