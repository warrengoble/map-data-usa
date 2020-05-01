import feathers from "@feathersjs/feathers";
import serviceMongoDB from "feathers-mongodb";
import { toPairs, pipe, filter, map } from "lodash/fp";

import feathersServerless from "../_utils/feathersServerless";
import connect from "../_utils/connect";

export const app = feathersServerless(feathers());

export default async (req, res) => {
  const collection = await connect();
  const service = serviceMongoDB({ Model: collection });

  app.use("data", service);
  app.service("data").hooks({
    before: {
      async find(context) {
        const { query = {} } = context.params;

        const filters = JSON.parse(query.filters || "{}");

        // Match
        const matchFilters = pipe(
          toPairs,
          map(([k, { type, filterValues = {} }]) =>
            pipe(
              toPairs,
              filter(([, v]) => v === true),
              map(([v]) => ({ [k]: type === "number" ? Number(v) : v }))
            )(filterValues)
          )
          // flattenDepth(1)
        )(filters);

        const results =
          matchFilters.length > 0
            ? await context.service.Model.aggregate([
                ...matchFilters.map((v) => ({ $match: { $or: v } })),
                {
                  $group: { _id: "$countyId", value: { $sum: "$value" } },
                },
              ]).toArray()
            : [];
        context.result = results;

        return context;
      },
      // Disable writing and saving for example
      // TODO Cut this up so it's reusable?
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
      },
    },
  });

  app.handler()(req, res);
};
