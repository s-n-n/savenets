module.exports = (sequelize, Sequelize) => {

    const Pigeon = sequelize.define('pigeon', {
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        active: {
            type: Sequelize.BOOLEAN, defaultValue: false
        },
    })

    return Pigeon
}