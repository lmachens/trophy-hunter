import { getUsersCollection } from '../users/collection';

export const resolvers = {
  Query: {
    async me(_parent, _args, context) {
      const Users = await getUsersCollection();
      const user = Users.findOne({ authToken: context.authToken });
      return user;
    },
    user(_parent, args) {
      console.log(args);
      return { email: 'Test' };
    }
  }
};
