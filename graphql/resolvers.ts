export const resolvers = {
  Query: {
    me(parent, args, context, info) {
      console.log('_context', context);
      return context.user;
    },
    user() {
      return { name: 'Test' };
    }
  }
};
