export default {
  databaseName: "quality-of-life",
  collectionName: "data",
  filters: {
    year: { type: "number", ui: "checkbox" },
    category: { type: "string", ui: "checkbox" },
  },
  aggerator: "countyId",
};
