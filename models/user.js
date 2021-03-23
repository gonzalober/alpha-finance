const sequelize = require("sequelize");

const User = sequelize.define("user", {
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  balance: {
    type: Number,
    default: 100,
  },
  transactions: [],
  portfolio: {
    totalValue: {
      type: Number,
      default: 0,
    },
    stocks: [],
  },
});

module.exports = User;
