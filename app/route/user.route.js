module.exports = function (app, authMiddleware) {

    const users = require('../controller/user.controller.js')

    // user login
    app.post('/api/user/login', users.login)

    // user logout
    app.get('/api/user/logout', users.logout)

    // get users account
    app.get('/api/user/account', authMiddleware, users.account)

    // create new user
    app.post('/api/user', users.create)
}
