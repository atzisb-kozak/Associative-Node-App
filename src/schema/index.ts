import { gql, IResolvers } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
export const resolvers: IResolvers<any, any> = {
  Query: {
    hello: () => 'Hello world!',
  },
};