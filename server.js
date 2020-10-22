const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  graphql,
} = require("graphql");

const app = express();

const db ={
  users: [
    {id: '1', email: 'blue@gmail.com', name: 'Blue'},
    {id: '2', email: 'pink@gmail.com', name: 'Pink'},
  ]
}

const schema = buildSchema(
  ` 
    type Query{
      users: [User!]! //object User cannot be null, as well as the list of users can not be null (User's array cannot hold any null values)
    }
    type User{
      id: ID!         //exclamation point stands for non-nullable. Every user has to have an id
      email: String!
      name:String
      avatarUrl: String
    }
  `
);

const rootValue = {
  users: () => db.users,
};

graphql(
  schema,
  `
    {
      users{
        email
      }
    }
  `,
  rootValue
)
  .then(console.log)
  .catch(console.error);
