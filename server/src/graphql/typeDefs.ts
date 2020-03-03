import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  input ListingInput {
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }
  
  type Query {
    listings: [Listing!]!
    listing(id: ID!): Listing!
  }
  
  type Mutation {
    deleteListing(id: ID!): Listing!
    addListing(newListing: ListingInput!): Listing
  }
`;
