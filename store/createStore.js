import { flow, toPairs, map, fromPairs } from "lodash/fp";

export default () =>
  function() {
    return {
      results: [],
      year: 1980,
      filters: {},
      //
      toggleFilter(key) {
        this.filters[key] !== undefined &&
          (this.filters[key] = !this.filters[key]);
      },
      updateYear(year) {
        this.year = year;
      },
      clearFilters() {
        this.filters = flow(
          toPairs,
          map(([k, v]) => [k, false]),
          fromPairs
        )(this.filters);
      },
      selectAllFilters() {
        this.filters = flow(
          toPairs,
          map(([k, v]) => [k, true]),
          fromPairs
        )(this.filters);
      }
    };
  };
