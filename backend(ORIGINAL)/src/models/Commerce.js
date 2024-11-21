const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const Commerce = sequelize.define('commerce', {

   credentialName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
   },
   credentialPassword: {
      type: DataTypes.STRING,
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      allowNull: true
   },
   trialTime: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   usesRemaining: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   payment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive'
   }

   //typeOfCommerceId

},
   {
      timestamps: true,
      paranoid: true
   }
);


module.exports = Commerce;