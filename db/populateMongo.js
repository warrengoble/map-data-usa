const fs = require("fs");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const filePath = "./db/mort.json";

const connect = url =>
  new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("Connected successfully to MongoDB server");

      resolve(client);
    });
  });

const pushDoc = async ({ collection, countyId, category, year, value }) => {
  const id = `${countyId}-${year}-${category}`;

  try {
    await collection.insertOne({
      _id: id,
      countyId: parseInt(countyId, 10),
      category,
      year: parseInt(year, 10),
      value: Number(value)
    });
  } catch (e) {
    const { code } = e;

    if (code === 11000) {
      console.log("Duplicate row. Skipping");
      return;
    }

    console.log(e);
  }
};

const app = async () => {
  const client = await connect(process.env.MONGODB_URI);
  const db = client.db("quality-of-life");
  const collection = await db.collection("data");

  const rows = JSON.parse(fs.readFileSync(filePath));

  await rows.reduce(
    async (
      a,
      {
        FIPS: countyId,
        Category: category,
        1980: value1980,
        1985: value1985,
        1990: value1990,
        1995: value1995,
        2000: value2000,
        2005: value2005,
        2010: value2010,
        2014: value2014
      },
      i
    ) => {
      await a;

      console.log(`Processing row ${i}.`);

      return Promise.all([
        pushDoc({
          collection,
          countyId,
          category,
          year: 1980,
          value: value1980
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 1985,
          value: value1985
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 1990,
          value: value1990
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 1995,
          value: value1995
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 2000,
          value: value2000
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 2005,
          value: value2005
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 2010,
          value: value2010
        }),
        pushDoc({
          collection,
          countyId,
          category,
          year: 2014,
          value: value2014
        })
      ]);
    },
    Promise.resolve()
  );

  console.log("Done.");

  client.close();
};

app();
