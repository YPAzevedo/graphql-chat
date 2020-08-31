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

  type Query {
    messagesByUser: [Message]!
    messagesByRoom: [Message]!
  }

  type Mutation {
    sendMessage(input: SendMessageInput): Message!
  }

  type Subscription {
    newMessage: Message!
  }
`;
