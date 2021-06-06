const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tasks', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;