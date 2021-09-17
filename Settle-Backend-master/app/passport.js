// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
// load up the user model
const User = require('../app/models/userModel');

module.exports = passport => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id).populate('role').exec((err, user) => {
            done(err, user);
        });
    });

    // LOCAL LOGIN =============================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, (req, email, password, done) => {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(() => {
            User.findOne({ 'email': email }).populate('role').exec((err, user) => {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else {
                    if (user.role.role == 'admin') {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('loginMessage', 'Oops! Permission Denied.'));
                    }

                }
            });
        });
    }));


    // LOCAL SIGNUP ============================================================

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, (req, email, password, done) => {

        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(() => {

            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'email': email }, (err, user) => {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // create the user
                        const newUser = new User();

                        newUser.email = req.body.email;
                        newUser.password = newUser.generateHash(req.body.password);
                        newUser.full_name = req.body.full_name;
                        
                        newUser.save(err => {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }

                });
                // if the user is logged in but has no local account...
            } else if (!req.user.email) {

                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'email': email }, (err, user) => {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        const user = req.user;
                        user.email = req.body.email;
                        user.password = user.generateHash(req.body.password);
                        user.full_name = req.body.full_name;
                        user.save(err => {
                            if (err)
                                return done(err);
                            return done(null, user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));
};