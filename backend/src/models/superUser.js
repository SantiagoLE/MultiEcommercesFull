'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class superUser extends Model {

    static associate(models) {

    }
  }
  superUser.init({
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
  }, {
    sequelize,
    modelName: 'superUser',
    timestamps: true,
    paranoid: true
  });


  superUser.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  superUser.beforeCreate(async (superUser) => {
    superUser.password = await bcrypt.hash(superUser.password, 10);
  });



  return superUser;
};