const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
  }
  input UserCreateInput {
    username: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  input UserByIdInput {
    id: String!
  }

  type Query {
    user(input: UserByIdInput!): User
    users: [User]!
  }

  type Mutation {
    signupUser(input: UserCreateInput!): AuthPayload!
    loginUser(input: UserSigninInput!): AuthPayload!
  }
`;
