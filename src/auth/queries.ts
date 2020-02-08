import gql from 'graphql-tag';

const QUERY_ME = gql`
  {
    me {
      email
    }
  }
`;

export async function queryMe(apolloClient) {
  const result = await apolloClient.query({
    query: QUERY_ME
  });
  const { me } = result.data;
  return me;
}
