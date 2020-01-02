// TODO Clean this up. Hack for demo
import filters from "./database/filters";

export default ({ Model }) => ({
  Model,
  async find({ query: {} = {} }) {
    // Generate random data for now

    switch (Model) {
      case "filters":
        return filters;
    }
  }
});
