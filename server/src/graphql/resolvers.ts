import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";
import { ObjectId } from "mongodb";
import { Database, Listing } from "../lib/types";
import crypto from "crypto";


export const resolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database}
      ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
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
    deleteListing: async (
      _root,
      { id }: { id: string },
      { db }: { db: Database}
    ): Promise<Listing> => {

      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete listing")
      }

      return deleteRes.value
    },
    addListing: (_root, { newListing }) => {
      newListing.id = crypto.randomBytes(16).toString("hex");

      listings.push(newListing);

      return newListing
    }
  },
  Listing: {
    id:
      (listing: Listing): string => listing._id.toString()
  }
};
