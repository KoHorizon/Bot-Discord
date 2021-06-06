const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task = sequelize.define('Task', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

});

module.exports = Task;