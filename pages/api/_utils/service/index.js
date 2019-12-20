import { map } from "lodash/fp";

// Custom service

// TODO Clean this up. Hack for demo
import filters from "./database/filters";
import countiesIds from "./database/counties";

export default ({ Model }) => ({
  Model,
  async find({ query: {} = {} }) {
    // Generate random data for now

    switch (Model) {
      case "filters":
        return filters;
      case "data":
        return map(v => ({
          id: Number(v),
          value: Math.random() * 0.5
        }))(countiesIds);
    }
  }
});
