import feathers from "@feathersjs/feathers";
import serviceMongoDB from "feathers-mongodb";
import { toPairs, pipe, map, reduce } from "lodash/fp";

import feathersServerless from "./_utils/feathersServerless";
import config from "./_utils/config";
import connect from "./_utils/connect";

const app = feathersServerless(feathers());

export default async (req, res) => {
  const collection = await connect();
  const service = serviceMongoDB({ Model: collection });

  app.use("filters", service);
  app.service("filters").hooks({
    before: {
      async find(context) {
        const { filters = {} } = config;

        const results = reduce(
          (a, { name, ...v }) => ({ ...a, [name]: v }),
          {}
        )(
          await pipe(
            toPairs,
            map(async ([name, value]) => ({
              name,
              ...value,
              filterValues: reduce(
                (a, v) => ({ ...a, [v]: false }),
                {}
              )(await context.service.Model.distinct(name)),
            })),
            async (v) => await Promise.all(v)
          )(filters)
        );

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
