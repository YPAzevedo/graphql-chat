module.exports = {
  Query: {
    room: async (_, { input }, { prisma }) => {
      const room = await prisma.room.findOne({
        where: {
          id: input.id,
        },
      });
      return room;
    },
    rooms: async (_, __, { prisma }) => {
      const rooms = await prisma.room.findMany();
      return rooms;
    },
  },
  Mutation: {
    createRoom: async (_, __, { prisma }) => {
      const room = await prisma.room.create({
        data: {},
      });
      return room;
    },
  },
};
