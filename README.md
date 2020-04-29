# Map Data USA

## Description

This is an application demo and boilerplate to create a interactive map of the USA with filters that can be used to display heatmap data for USA Counties. Any data can be used from a MongoDB collection. See the Data Config Example below.

## Design goals

- Use serverless lambda type hosting such as Zeit Now and AWS Lambda.
- Use FeathersJS and it's adapters for data stores. This will need to work with serverless micro services API.
- MobX global context for state management.
- Build a simple USA Map React component to display the county level data.

## Demo

Mortality data is stored using in a MongoDB collection. For local development you can use a `.env` file and set MONGODB_URI for your local instance.

https://map-data-usa.now.sh

## Install and dev usage

```bash
npm install

# dev run locally
npm run dev

# Goto: http://localhost:3000
```

## Data Config Example

Config for data can be located at `/pages/api/_utils/config.js`. Please modify this file to match your data structure.

```javascript
export default {
  filters: {
    year: { type: "number", ui: "checkbox" },
    category: { type: "string", ui: "checkbox" },
  },
  aggerator: "countyId",
};
```

MongoDB JSON Document

```js
{
  _id: "id";
  countyId: 1;
  category: "Neonatal disorders";
  year: 1985;
  value: 8.51;
}
```

## Major technology

- NextJS: https://nextjs.org/
- React: https://reactjs.org/
- MobX: https://mobx.js.org/
- FeathersJS: https://feathersjs.com/
- lodash/fp: https://github.com/lodash/lodash/wiki/FP-Guide
- Ant Design: https://ant.design/
- MongoDB: https://www.mongodb.com/

## Serverless configs

### Zeit Now

You can add the `MONGODB_URI` as a secret using the following now command.

```bash
now secrets add mongodb_uri <secret mongodb uri>
```

Zeit now uses a file named `now.json` to set the ENV variable `MONGODB_URI`.

```json
{
  "name": "map-data-usa",
  "version": 2,
  "env": {
    "MONGODB_URI": "@mongodb_uri"
  }
}
```

### AWS Lambda

TODO

## Notes & TODOS

- FeatherJS serverless micro service should be cut out into a reusable NPM component?
- Clean up map satellite image for Alaska and Hawaii.
- Sync MobX store with browser localstorage and save query settings and map controlled props?

## Map Component

Map component used the following SVG data county data. A script was used to rebuild the data in JSON format so it could be imported to create a React component.

- Package / Script: https://github.com/warrengoble/convert-counties-svg2json
- Data: https://upload.wikimedia.org/wikipedia/commons/5/59/Usa_counties_large.svg

## Credits & Acknowledgements

- Demo Data - IHME United States Mortality Rates by County 1980-2014: National - All. (Deaths per 100,000 population)

  - https://www.kaggle.com/IHME/us-countylevel-mortality
  - http://ghdx.healthdata.org/record/ihme-data/united-states-mortality-rates-county-1980-2014

- USA background image - Credit NASA and Visible Earth for providing access to the satellite images for creation of background image.
  - https://visibleearth.nasa.gov/collection/1484/blue-marble
  - https://earthobservatory.nasa.gov/features/BlueMarble
  - https://www.nasa.gov/multimedia/guidelines/index.html
