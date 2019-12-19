const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const axios = require("axios");

export default ({ path = "/api", service = "feathers" } = {}) => {
  const app = feathers();
  const restClient = rest(path);

  app.configure(restClient.axios(axios));
  return app.service(service);
};
