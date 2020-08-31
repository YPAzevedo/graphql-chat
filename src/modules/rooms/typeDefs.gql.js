const { gql } = require("apollo-server");

module.exports = gql`
  type Room {
    id: ID!
    users: [User]!
    messages: [Message]!
  }

  type Query {
    room: Room
    rooms: [Room]!
  }
`;
