const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    id: ID!
    user: User!
    room: Room!
    content: String!
    createdAt: String!
  }

  input SendMessageInput {
    userId: String!
    roomId: String!
    content: String!
  }

  input NewMessageSubscriptionInput {
    roomId: String!
  }

  input MessagesByRoomInput {
    roomId: String!
  }
  input MessagesByUserInput {
    userId: String!
  }

  type Query {
    messagesByUser(inpurt: MessagesByUserInput!): [Message]!
    messagesByRoom(input: MessagesByRoomInput!): [Message]!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
  }

  type Subscription {
    newMessage(input: NewMessageSubscriptionInput!): Message!
  }
`;
