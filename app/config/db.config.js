const env = require('./env.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    logging: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize)
db.pigeons = require('../model/pigeon.model.js')(sequelize, Sequelize)

module.exports = db