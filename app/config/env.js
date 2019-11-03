const env = {
    database: 'heroku_deb8f2418aef4e6',
    username: 'b5d9f76a019420',
    password: 'b4a714dd',
    host: 'mysql://b5d9f76a019420:b4a714dd@eu-cdbr-west-02.cleardb.net/heroku_deb8f2418aef4e6?reconnect=true',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = env