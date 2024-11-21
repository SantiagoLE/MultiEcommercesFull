const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

//Mayuscula y singular         minuscula y singular          
const TypeOfCommerce = sequelize.define('typeOfCommerce', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},
    {
        timestamps: true,
        paranoid: true
    }
);

module.exports = TypeOfCommerce;