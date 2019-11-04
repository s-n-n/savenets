const express = require('express')
const app = express()

// bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// cors
const cors = require('cors')
const corsOptions = {
//    origin: 'http://localhost:4200',
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// cookieSession
const cookieSession = require('cookie-session')
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// passport
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}

// db force
const db = require('./app/config/db.config.js')
const syncParams = { force: false }
db.sequelize.sync(syncParams).then(() => {
    console.log('Drop and Resync with { force: ' + syncParams.force + ' }')
})

// routes
require('./app/route/user.route.js')(app, authMiddleware)
require('./app/route/pigeon.route.js')(app, authMiddleware)

// Create a Server
const server = app.listen(process.env.PORT, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})