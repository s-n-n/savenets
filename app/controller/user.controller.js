const db = require('../config/db.config.js')
const User = db.users


const passport = require('passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// user login
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info])
        }

        req.login(user, (err) => {
            res.send("Logged in")
        })
    })(req, res, next)
}

// user logout
exports.logout = (req, res) => {
    req.logout()
    return res.send()
}

// get users account
exports.account = (req, res) => {
    User.findOne({ where: { id: req.session.passport.user } }).then(user => {
        return res.send({ user: user })
    })
}

// create new user
exports.create = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        }).then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send("Error -> " + err)
        })
    });
};


// LocalStrategy
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    (username, password, done) => {
        User.findOne({ where: { email: username } }).then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    return done(null, user)
                }

                done(null, false, { message: 'Incorrect password' })
            });
        });
    }
))
// serializeUser
passport.serializeUser((user, done) => {
    done(null, user.id)
})
// deserializeUser
passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
        done(null, user)
    })
})
