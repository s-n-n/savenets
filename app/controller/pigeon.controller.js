const db = require('../config/db.config.js')
const Pigeon = db.pigeons


// create new pigeon
exports.create = (req, res) => {
    Pigeon.create({
        name: req.body.name,
        age: req.body.age
    }).then(pigeon => {
        res.send(pigeon)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

// get all pigeon
exports.findAll = (req, res) => {
    Pigeon.findAll().then(pigeons => {
        res.send(pigeons)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

// get single pigeon by id
exports.findById = (req, res) => {
    Pigeon.findByPk(req.params.pigeonId).then(pigeon => {
        res.send(pigeon)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

// get pigeons age
exports.findByAge = (req, res) => {
    Pigeon.findAll({
        where: {
            age: req.params.age
        }
    }).then(
        pigeons => {
            res.send(pigeons)
        }
    ).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

// update pigeon with id
exports.update = (req, res) => {
    var pigeon = req.body
    const id = req.params.pigeonId
    Pigeon.update({ name: req.body.name, age: req.body.age, active: req.body.active },
        { where: { id: req.params.pigeonId } }
    ).then(() => {
        res.status(200).send(pigeon)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

// delete pigeon with id
exports.delete = (req, res) => {
    const id = req.params.pigeonId
    Pigeon.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('Pigeon has been deleted!')
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}