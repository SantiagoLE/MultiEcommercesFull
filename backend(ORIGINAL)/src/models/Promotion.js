const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Promotion = sequelize.define('promotion', {
    // Se definen las columnas
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    limitOfProducts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fixedAssociation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },

    // commerceId

},
    {
        timestamps: true,
        paranoid: true
    }
);

module.exports = Promotion;