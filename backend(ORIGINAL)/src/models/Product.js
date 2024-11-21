const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // commerceId

},
  {
    timestamps: true,
    paranoid: true
  }
);

module.exports = Product;