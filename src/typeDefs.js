const { gql } = require("apollo-server");
const { mergeTypeDefs } = require('graphql-tools')
const users = require("./modules/users/typeDefs.gql");
const messages = require("./modules/messages/typeDefs.gql");
const rooms = require("./modules/rooms/typeDefs.gql");

const rootSchema = gql`
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = mergeTypeDefs([rootSchema, users, messages, rooms]);
