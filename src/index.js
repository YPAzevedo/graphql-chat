const { ApolloServer, PubSub } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema.gql");

const users = [
  {
    id: "23warsar783747rsa",
    username: "noobmaster69",
    email: "noobmaster69@email.com",
    password: "123456",
  },
  {
    id: "73w4r6ar783747wea",
    username: "progamer420",
    email: "progamer420@email.com",
    password: "123456",
  },
];

const messages = [];

const rooms = [];

const pubsubChannels = {
  newMessage: "NEW_MESSAGE",
};

const resolvers = {
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([pubsubChannels.newMessage]),
    },
  },
  Query: {
    user: (_, args) => users.find((user) => user.id === args.id),
    users: () => users,
  },
  Mutation: {
    signupUser: (_, args) => {
      const newUser = {
        ...args.input,
        id: `${Math.random()}`,
        password: bcrypt.hashSync(args.input.password, 3),
      };
      users.push(newUser);
      return { token: jwt.sign(newUser, "secret") };
    },
    loginUser: (_, args) => {
      const user = users.find((user) => user.email === args.input.email);
      if (!user) {
        throw Error("Incorrect Email/Password");
      }
      const isMatch = bcrypt.compareSync(args.input.password, user.password);
      if (!isMatch) {
        throw Error("Incorrect Email/Password");
      }
      return { token: jwt.sign(user, "secret") };
    },
    sendMessage: (_, args, context) => {
      const newMessage = { ...args.input, id: `${Math.random()}` };
      messages.push(newMessage);
      context.pubsub.publish(pubsubChannels.newMessage, { newMessage });
      return newMessage;
    },
  },
};

const pubsub = new PubSub();
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ""
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
