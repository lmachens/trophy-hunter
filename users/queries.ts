import gql from 'graphql-tag';

export async function queryUser(apolloClient) {
  const result = await apolloClient.query({
    query: gql`
      {
        user {
          name
        }
      }
    `
  });
  const { user } = result.data;
  return user;
}
