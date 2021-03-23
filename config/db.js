import Sequelize from "sequelize";
import _ from "lodash";
import Faker from "faker";

const Conn = new Sequelize("alpha_finance", "gonzalober", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

const User = Conn.define("user", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    required: true,
    validate: { isEmail: true },
  },
  userName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  balance: {
    type: Sequelize.INTEGER,
    default: 100,
  },
  portfolioValue: {
    type: Sequelize.FLOAT,
    default: 0,
  },
});

const Stock = Conn.define("stock", {
  ticker: {
    type: Sequelize.STRING,
    //unique: true,// I NEED TO ADD UNIQUE TICKER AFTERWARDS!!!
    required: true,
  },
  volume: {
    type: Sequelize.INTEGER,
    required: true,
  },
  price: {
    type: Sequelize.FLOAT,
    required: true,
  },
  low: {
    type: Sequelize.FLOAT,
    required: true,
  },
  high: {
    type: Sequelize.FLOAT,
    required: true,
  },
});
User.hasMany(Stock);
Stock.belongsTo(User);

Conn.sync({ force: true }).then(() => {
  _.times(3, () => {
    return User.create({
      userName: Faker.name.firstName(),
      email: Faker.internet.email(),
    }).then((user) => {
      return user.createStock({
        ticker: "FB",
        volume: 725489,
        price: 292.48,
        low: 290.1,
        high: 294.85,
      });
    });
  });
});

export default Conn;
