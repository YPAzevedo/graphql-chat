const { gql } = require('apollo-server');

module.exports = gql`
  type Room {
    id: ID!
    createdAt: String!
  }

  input RoomByIdInput {
    id: String!
  }

  type Query {
    room(input: RoomByIdInput!): Room
    rooms: [Room]!
  }

  type Mutation {
    createRoom: Room!
  }
`;
