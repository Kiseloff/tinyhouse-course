import {IResolvers} from "apollo-server-express";
import {listings} from "../listings";
import crypto from "crypto";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings
    },
    listing: (_root, { id }) => {
      const result = listings.filter(listing => listing.id === id)[0];

      if (result)
        return result;
      else
        throw new Error("there is no such a listing")
    }
  },
  Mutation: {
    deleteListing: (_root, { id }) => {
      for (let i = 0; i < listings.length; i++){
        if (listings[i].id === id) {
          return listings.splice(i,1)[0];
        }
      }

      throw new Error("failed to delete listing")
    },
    addListing: (_root, { newListing }) => {
      newListing.id = crypto.randomBytes(16).toString("hex");

      listings.push(newListing);

      return newListing
    }
  }
};
