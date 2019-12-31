import feathers from "@feathersjs/feathers";
import feathersServerless from "../_utils/feathersServerless";
import { MongoClient, ObjectID } from "mongodb";
import serviceMongoDB from "feathers-mongodb";

let cachedClient = null;

export const app = feathersServerless(feathers());

const connectMongoDB = async uri => {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  cachedClient = client;
  return client;
};

export default async (req, res) => {
  const client = await connectMongoDB(process.env.MONGODB_URI);
  const db = await client.db("quality-of-life");
  const collection = await db.collection("data");
  const service = serviceMongoDB({ Model: collection });

  app.use("data", service);
  app.service("data").hooks({
    before: {
      async find(context) {
        const { query = {} } = context.params;

        const year = Number(query.year);

        // TODO Add filters
        const results = await context.service.Model.aggregate([
          { $match: { year } },
          {
            $group: { _id: "$countyId", value: { $sum: "$value" } }
          }
        ]).toArray();

        context.result = results;

        return context;
      },
      // Disable writing and saving for example
      async create(context) {
        context.result = {};
        return context;
      },
      async update(context) {
        context.result = {};
        return context;
      },
      async patch(context) {
        context.result = {};
        return context;
      },
      async remove(context) {
        context.result = {};
        return context;
      }
    }
  });

  app.handler()(req, res);
};
