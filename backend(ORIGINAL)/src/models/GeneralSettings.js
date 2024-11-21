const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const GeneralSettings = sequelize.define('generalSettings', {

    logo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    mainServicePointName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mainServicePointPicture: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    standarServicePointName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    standarServicePointPicture: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quantityStandarServicePoint: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    workDays: {
        type: DataTypes.JSON,
        allowNull: false,
       defaultValue: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    },
    workStart: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: "00:00"
    },
    workEnd: {
        type: DataTypes.TIME,
        allowNull: false,
         defaultValue: "23:59"
    }
    
    // commerceId
},
    {
        timestamps: true,
        paranoid: true
    });

module.exports = GeneralSettings;