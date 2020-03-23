import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const {
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_CLUSTER: cluster,
  DB_NAME: dbName
} = process.env;

export const connectDatabase = async (): Promise<Database> => {
  const uri =
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db(dbName);

  return {
    listings: db.collection('test_listings')
  }
};
