export default service =>
  function() {
    return {
      results: [],
      year: 1980,
      filters: new Map(),
      //
      toggleFilter(key) {
        this.filters.has(key) && this.filters.set(key, !this.filters.get(key));
      },
      updateYear(year) {
        this.year = year;
      }
    };
  };
