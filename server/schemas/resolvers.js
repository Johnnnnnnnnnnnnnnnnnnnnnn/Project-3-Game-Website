const { User, Thread } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('threads');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('threads');
    },
    threads: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thread.find(params).sort({ createdAt: -1 });
    },
    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('threads');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThread: async (parent, { threadText }, context) => {
      if (context.user) {
        const thread = await Thread.create({
          threadText,
          threadAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { threads: thread._id } }
        );

        return thread;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { threadId, commentText }, context) => {
      if (context.user) {
        return Thread.findOneAndUpdate(
          { _id: threadId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeThread: async (parent, { threadId }, context) => {
      if (context.user) {
        const thread = await Thread.findOneAndDelete({
          _id: threadId,
          threadAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { threads: thread._id } }
        );

        return thread;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { threadId, commentId }, context) => {
      if (context.user) {
        return Thread.findOneAndUpdate(
          { _id: threadId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
