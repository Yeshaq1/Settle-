const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require('user/models/user.model');
const cfg = require("./config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('token')
};

module.exports = () => {
    const strategy = new Strategy(params, (payload, done) => {
        users.findById(payload.id).populate({
            'path': 'role',
            'select': 'role title'
        }).exec((err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: (req, res, next) => {
            passport.authenticate("jwt", cfg.jwtSession, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    //return res.redirect('/' + process.env.ADMIN_FOLDER_NAME)
                    return res.redirect('/')
                }
                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return res.redirect('/');
                }

            })(req, res, next);
        },
        // This is for webservice jwt token check //
        authenticateAPI: (req, res, next) => {
            // check for nonsecure path like login //
            const nonSecurePaths = cfg.nonSecurePaths;
            //console.log("50>>",req.path,">>",nonSecurePaths);
            //console.log(_.contains(nonSecurePaths, req.path));
            if (_.contains(nonSecurePaths, req.path)) return next();
            // check for nonsecure path like login //
            passport.authenticate("jwt", cfg.jwtSession, (err, user) => {
                if (err) {
                    res.send({
                        status: 500,
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                }
                if (!user) {
                    res.send({
                        status: 500,
                        auth: false,
                        message: "There was a problem finding the user."
                    });
                }
                if (user) {
                    req.user = user;
                    return next();
                }
            })(req, res, next);
        }
    };
};