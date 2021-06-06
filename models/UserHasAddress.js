const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserHasAddress = sequelize.define('UserHasAddress', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: "users_has_addresses"
});

module.exports = UserHasAddress;