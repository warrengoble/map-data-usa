const feathers = require("@feathersjs/feathers");

// Todo create separate function for this
const fs = require("fs");

// TODO Wrap all this in function?
const app = feathers();
// console.log("result parsed", second - first);

app.use("/feathers", {
  async find(params) {
    let rawdata = fs.readFileSync(`./db/mort.json`);
    let result = JSON.parse(rawdata);

    // Lookup JSON db
    // console.log("params", params);
    // const ret = result.filter(({ date }) => date === params.date);

    return result;
    // console.log("result");

    // return [];
    // return ret;
  },
  async get(id, params) {
    // Filter by Id
    return {
      id,
      text: `This is the ${id} message!`
    };
  },
  // TODO Disabled using JSON read-only
  //   async create(data, params) {},
  //   async update(id, data, params) {},
  //   async patch(id, data, params) {},
  //   async remove(id, params) {},
  setup(app, path) {
    // TODO
  }
});

export default app.service("feathers");
