import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
    token: String!
  }
  type Query {
    me: User
  }
`;
