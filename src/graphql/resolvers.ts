import { getUsersCollection, calculateExpireAt } from '../auth/collection';

export const resolvers = {
  Query: {
    async me(_parent, _args, context) {
      const Users = await getUsersCollection();
      const expiresAt = calculateExpireAt();
      const user = await Users.findOneAndUpdate(
        {
          authTokens: {
            $elemMatch: {
              token: context.authToken,
              expiresAt: { $gt: new Date() },
              verifyToken: { $exists: false }
            }
          }
        },
        {
          $set: {
            'authTokens.$.expiresAt': expiresAt
          }
        }
      );

      return user.value;
    }
  }
};
