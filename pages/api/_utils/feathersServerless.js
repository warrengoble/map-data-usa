import Proto from "uberproto";
import { split, flow, replace, slice, join } from "lodash/fp";

const methodFunc = {
  GET: ({ id, query }) =>
    id ? { func: "get", args: [id] } : { func: "find", args: [{ query }] },
  POST: ({ body }) => ({ func: "create", args: [body] }),
  PUT: ({ id, body, query }) => ({
    func: "update",
    args: [id || null, body, { query }]
  }),
  PATCH: ({ id, body, query }) => ({
    func: "patch",
    args: [id || null, body, { query }]
  }),
  DELETE: ({ id, query }) => ({ func: "remove", args: [id || null, { query }] })
};

export default feathersApp => {
  const mixin = {
    setup(func) {
      this.setupFunc = func;
      return this;
    },

    handler({ prefix = "/api/" } = {}) {
      return async (req, res) => {
        const { method, url, query, body } = req;

        res.setHeader("Content-Type", "application/json");

        // Clean this up? This should only run once
        if (!this.setupCache) {
          this.setupCache =
            typeof this.setupFunc === "function"
              ? this.setupFunc(this)
              : Promise.resolve();
        }

        await this.setupCache;

        const path = flow(
          replace(prefix, ""),
          split("?"),
          ({ [0]: path }) => path
        )(url);

        // Check if there is an ID
        // FIXME Another way to handle this?
        const { serviceName, id } = !feathersApp.service(path)
          ? {
              serviceName: flow(split("/"), slice(0, -1), join("/"))(path),
              id: decodeURIComponent(
                flow(split("/"), slice(-1, Infinity), join(""))(path)
              )
            }
          : { serviceName: path };

        const service = feathersApp.service(serviceName);

        if (!service) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Service not found: ${path}` }));

          return;
        }

        const { func, args } = (methodFunc[method] || (() => ({})))({
          query,
          id,
          body
        });

        if (!func || !service[func]) {
          res.statusCode = 404;
          res.end(
            JSON.stringify({
              error: `Method ${func} not implemented`
            })
          );

          return;
        }

        return service[func](...args)
          .then(data => {
            res.statusCode = 200;
            res.end(JSON.stringify(data));
          })
          .catch(e => {
            res.statusCode = e.code || 500;
            res.end(JSON.stringify({ error: e.message }));
          });
      };
    }
  };

  return Proto.mixin(mixin, feathersApp);
};
