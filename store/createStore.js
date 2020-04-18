import { flow, toPairs, map, fromPairs } from "lodash/fp";

export default () =>
  function () {
    return {
      loading: false,
      results: [],
      filters: {},
      // clearFilters() {
      //   this.filters = flow(
      //     toPairs,
      //     map(([k, v]) => [k, false]),
      //     fromPairs
      //   )(this.filters);
      // },
      // selectAllFilters() {
      //   this.filters = flow(
      //     toPairs,
      //     map(([k, v]) => [k, true]),
      //     fromPairs
      //   )(this.filters);
      // }
    };
  };
