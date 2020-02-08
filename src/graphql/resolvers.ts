import { getUsersCollection, calculateExpireAt } from '../users/collection';

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
              expiresAt: { $gt: Date.now() }
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
