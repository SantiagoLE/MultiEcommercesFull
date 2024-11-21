const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const SuperUser = sequelize.define('superUser', {

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "superUser",
        allowNull: false,
    }
},
    {
        timestamps: true,
        paranoid: true
    });

module.exports = SuperUser;