const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ProductPresentation = sequelize.define("productPresentation", {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "-",
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  // commerceId

},
  {
    timestamps: true,
    paranoid: true
  }
);

module.exports = ProductPresentation;