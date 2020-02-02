import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { handleContext } from '../../graphql/context';

const apolloServer = new ApolloServer({
  schema,
  context: handleContext
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
