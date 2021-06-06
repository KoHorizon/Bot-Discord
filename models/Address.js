const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Address = sequelize.define('Address', {

    line: {
        type: DataTypes.STRING,
        allowNull: false
    },

    zipcode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    town: {
        type: DataTypes.STRING,
        allowNull: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Address;