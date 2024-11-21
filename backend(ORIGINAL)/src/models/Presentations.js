const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Presentation = sequelize.define("presentation", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // commerceId

},
  {
    timestamps: true,
    paranoid: true
  }
);

module.exports = Presentation;