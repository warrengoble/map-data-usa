const feathers = require("@feathersjs/feathers");

const app = feathers();

// TODO Clean this up. Hack for demo
// Counties ids

// FIXME Try and use an existing database adapter
app.use("/feathers", {
  async find(params) {
    // Generate random data for now

    return [{}];
  }
  // Not used at moment for demo
  // async get(id, params) {
  //   return {};
  // },
  // async create(data, params) {},
  // async update(id, data, params) {},
  // async patch(id, data, params) {},
  // async remove(id, params) {},
  // setup(app, path) {
  //   // TODO
  // }
});

export default app.service("feathers");
