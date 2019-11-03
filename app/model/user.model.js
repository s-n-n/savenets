module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING,
            is: ["^[a-z]+$", 'i'],
            allowNull: false,
            required: true,
        },
        last_name: {
            type: Sequelize.STRING,
            is: ["^[a-z]+$", 'i'],
            allowNull: false,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            isEmail: true,
            isUnique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true,
            len: [2, 10],
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    })

    return User
}