const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const User = sequelize.define('user', {

    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
    },
    restrictedTime: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

    // commerceId

},
    {
        timestamps: true,
        paranoid: true
    });


module.exports = User;