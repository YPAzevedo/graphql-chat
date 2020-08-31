const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    user: async (_, { input }, context) => {
      const user = await context.prisma.user.findOne({
        where: {
          id: input.id,
        },
      });

      return user;
    },

    users: async (_, __, context) => {
      const users = await context.prisma.user.findMany();

      return users;
    },
  },
  Mutation: {
    signupUser: async (_, { input }, { prisma }) => {
      const newUser = {
        ...input,
        password: bcrypt.hashSync(input.password, 3),
      };
      await prisma.user.create({
        data: newUser,
      });
      return { token: jwt.sign(newUser, 'secret') };
    },

    loginUser: async (_, { input }, { prisma }) => {
      const user = await prisma.user.findOne({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        throw Error('Incorrect Email/Password');
      }
      const isMatch = bcrypt.compareSync(input.password, user.password);
      if (!isMatch) {
        throw Error('Incorrect Email/Password');
      }
      return { token: jwt.sign(user, 'secret') };
    },
  },
};
