module.exports = function (app, authMiddleware) {

    const pigeons = require('../controller/pigeon.controller.js')

    // create new pigeon
    app.post('/api/pigeon', pigeons.create)

    // get all pigeon
    app.get('/api/pigeons', authMiddleware, pigeons.findAll)

    // get single pigeon by id
    app.get('/api/pigeon/:pigeonId', pigeons.findById)

    // get pigeons age
    app.get('/api/pigeons/age/:age', pigeons.findByAge)

    // update pigeon with id
    app.put('/api/pigeon/:pigeonId', pigeons.update)

    // delete pigeon with id
    app.delete('/api/pigeon/:pigeonId', pigeons.delete)
}