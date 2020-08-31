const { withFilter } = require('apollo-server');

const { NEW_MESSAGE } = require('../../subscription.channels');

module.exports = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, args, context) => context.pubsub.asyncIterator([NEW_MESSAGE]),
        (payload, variables) => {
          // Only subscribe to messages from the room you are currently in
          return payload.newMessage.room === variables.input.roomId;
        },
      ),
    },
  },

  Query: {
    messagesByRoom: async (_, { input }, { prisma }) => {
      const messages = prisma.message.findMany({
        where: {
          room: input.roomId,
        },
      });
      return messages;
    },
  },

  Mutation: {
    sendMessage: async (_, { input }, { prisma, pubsub }) => {
      const newMessage = {
        // 👇🏽 add roomId to the return for this resolver, so we can acess room id on subscription
        room: input.roomId,
        user: input.userId,
        content: input.content,
      };
      const message = await prisma.message.create({
        data: newMessage,
      });
      pubsub.publish(NEW_MESSAGE, { newMessage: message });
      return message;
    },
  },

  Message: {
    room: async (obj, _, { prisma }) => {
      const room = await prisma.room.findOne({
        where: {
          id: obj.room,
        },
      });
      return room;
    },

    user: async (obj, _, { prisma }) => {
      const user = await prisma.user.findOne({
        where: {
          id: obj.user,
        },
      });
      return user;
    },
  },
};
