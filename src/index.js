const { ApolloServer, PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");

const typeDefs = require("./typeDefs");
const resolvers = require('./resolvers')

const pubsub = new PubSub();
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token =
      req && req.headers.authorization ? req.headers.authorization : "";
    const user = token ? jwt.verify(token, "secret") : null;

    return {
      user,
      pubsub,
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
