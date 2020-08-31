const pubsubChannels = require('../../subscription.channels')
const messages = [];

module.exports = {
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([pubsubChannels.newMessage]),
    },
  },
  Query: {},
  Mutation: {
    sendMessage: (_, args, context) => {
      const newMessage = { ...args.input, id: `${Math.random()}` };
      messages.push(newMessage);
      context.pubsub.publish(pubsubChannels.newMessage, { newMessage });
      return newMessage;
    },
  },
};
