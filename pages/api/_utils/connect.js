import { MongoClient } from "mongodb";

import config from "./config";

let cachedClient = null;

const connectMongoDB = async (uri) => {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  return client;
};

export default async () => {
  const { databaseName, collectionName } = config;

  const client = await connectMongoDB(process.env.MONGODB_URI);
  const db = await client.db(databaseName);
  const collection = await db.collection(collectionName);

  return collection;
};
