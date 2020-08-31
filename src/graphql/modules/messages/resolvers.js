const { withFilter } = require('apollo-server');

const { NEW_MESSAGE } = require('../../subscription.channels');

const messages = [];

module.exports = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, args, context) => context.pubsub.asyncIterator([NEW_MESSAGE]),
        (payload, variables) => {
          // Only subscribe to messages from the room you are currently in
          return payload.newMessage.roomId === variables.input.roomId;
        },
      ),
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
