// Custom service

// TODO Clean this up. Hack for demo
import filters from "./data/filters";
import countiesIds from "./data/counties";

export default {
    async find({ query: { filters: queryFilters } = {} }) {
      // Generate random data for now
  
      return queryFilters
        ? filters
        : countiesIds.map(v => ({ id: Number(v), value: Math.random() * 0.5 }));
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
  }