import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} from "graphql";
import Db from "./config/db.js";

//User Type
const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(user) {
        return user.id;
      },
    },
    userName: {
      type: GraphQLString,
      resolve(user) {
        return user.userName;
      },
    },
    email: {
      type: GraphQLString,
      resolve(user) {
        return user.email;
      },
    },
    password: {
      type: GraphQLString,
      resolve(user) {
        return user.password;
      },
    },
    portfolio: {
      type: GraphQLFloat,
      resolve(user) {
        return user.portfolio;
      },
    },
    stocks: {
      type: new GraphQLList(Stock),
      resolve(user) {
        return user.getStocks();
      },
    },
  }),
});
//Stock type
const Stock = new GraphQLObjectType({
  name: "Stock",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(stock) {
        return stock.id;
      },
    },
    ticker: {
      type: GraphQLString,
      resolve(stock) {
        return stock.ticker;
      },
    },
    volume: {
      type: GraphQLInt,
      resolve(stock) {
        return stock.volume;
      },
    },
    price: {
      type: GraphQLFloat,
      resolve(stock) {
        return stock.price;
      },
    },
    low: {
      type: GraphQLFloat,
      resolve(stock) {
        return stock.low;
      },
    },
    high: {
      type: GraphQLFloat,
      resolve(stock) {
        return stock.high;
      },
    },
    user: {
      type: User,
      resolve(stock) {
        return stock.getUser();
      },
    },
  }),
});
//Root Query
const Query = new GraphQLObjectType({
  name: "Query",
  description: "this is a root query",
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt,
          },
          userName: {
            type: GraphQLString,
          },
          email: {
            type: GraphQLString,
          },
        },
        //validations can go here
        resolve(root, args) {
          return Db.models.user.findAll({ where: args });
        },
      },
      stocks: {
        type: new GraphQLList(Stock),
        resolve(root, args) {
          return Db.models.stock.findAll({ where: args });
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Functions to create things",
  fields: () => {
    return {
      addUser: {
        type: User,
        args: {
          userName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          password: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(_, args) {
          //"_" root
          return Db.models.user.create({
            userName: args.userName,
            email: args.email.toLowerCase(),
            password: args.password,
          });
        },
      },
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
export default Schema;
