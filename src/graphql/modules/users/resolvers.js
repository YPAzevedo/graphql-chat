const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

module.exports = {
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
      return { token: jwt.sign(newUser, 'secret') };
    },
    loginUser: (_, args) => {
      const user = users.find((_user) => _user.email === args.input.email);
      if (!user) {
        throw Error('Incorrect Email/Password');
      }
      const isMatch = bcrypt.compareSync(args.input.password, user.password);
      if (!isMatch) {
        throw Error('Incorrect Email/Password');
      }
      return { token: jwt.sign(user, 'secret') };
    },
  },
};
