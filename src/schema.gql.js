const { gql } = require("apollo-server");

module.exports = typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Message {
    id: ID!
    user: User!
    room: Room!
    content: String!
    createdAt: String!
  }

  type Room {
    id: ID!
    users: [User]!
    messages: [Message]!
  }

  type Query {
    user: User
    users: [User]!
    messagesByUser: [Message]!
    messagesByRoom: [Message]!
    room: Room
    rooms: [Room]!
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

  input SendMessageInput {
    userId: String!
    roomId: String!
    content: String!
  }

  type Mutation {
    signupUser(input: UserCreateInput!): AuthPayload!
    loginUser(input: UserSigninInput!): AuthPayload!
    sendMessage(input: SendMessageInput): Message!
  }

  type Subscription {
    newMessage: Message!
  }
`;
