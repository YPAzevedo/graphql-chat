const { ApolloServer, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

function startServer() {
  const pubsub = new PubSub();
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token =
        req && req.headers.authorization ? req.headers.authorization : '';
      const user = token ? jwt.verify(token, 'secret') : null;

      return {
        user,
        pubsub,
      };
    },
    subscriptions: {
      onConnect: () => {
        // TODO: Implement ws authentication.
        // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#authentication-over-websocket
      },
    },
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line
    console.log(`🚀  Server ready at ${subscriptionsUrl}`); // eslint-disable-line
  });
}

module.exports = startServer;
