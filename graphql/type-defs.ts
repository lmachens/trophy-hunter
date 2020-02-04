import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    email: String!
    authToken: String!
  }
  type Query {
    me: User
    user: User
  }
`;
