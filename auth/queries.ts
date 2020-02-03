import gql from 'graphql-tag';

export async function queryMe(apolloClient) {
  const result = await apolloClient.query({
    query: gql`
      {
        me {
          name
          token
        }
      }
    `
  });
  const { me } = result.data;
  return me;
}
