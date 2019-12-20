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
      }
    };
  };
