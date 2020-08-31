const { mergeResolvers } = require('graphql-tools')
const users = require("./modules/users/resolvers");
const messages = require("./modules/messages/resolvers");
const rooms = require("./modules/rooms/resolvers");


module.exports = mergeResolvers([users, messages, rooms])
