const { NEW_MESSAGE } = require('../../subscription.channels');

const messages = [];

module.exports = {
  Subscription: {
    newMessage: {
      subscribe: (_, args, context) =>
        context.pubsub.asyncIterator([NEW_MESSAGE]),
    },
  },
  Query: {},
  Mutation: {
    sendMessage: (_, args, context) => {
      const newMessage = { ...args.input, id: `${Math.random()}` };
      messages.push(newMessage);
      context.pubsub.publish(NEW_MESSAGE, { newMessage });
      return newMessage;
    },
  },
};
