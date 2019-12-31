# Quality of Life Map (USA)

## Description

This is an application demo and boilerplate to create a visual map of the USA with filters that can be used to display heatmap data for Counties and States. Data for the project was initially going to be tested using Mortality rate date and show a heatmap at a county level.

## Design goals

- Use serverless lambda type hosting such as Zeit Now and AWS Lambda.
- Use FeathersJS and it's adapters for data stores. This will need to work with serverless micro services API.
- Try and use SSR (Server Side Render) when available.
- MobX global context for state management.
- Build a simple USA Map React component with county level data.
- Tree based querying for nested data. (Incomplete)

## Demo

https://quality-of-life-map.now.sh

## Install and dev usage

```bash
npm install

# dev run locally
npm run dev

# Goto: http://localhost:3000
```

## Major technology

- NextJS - https://nextjs.org/
- React - https://reactjs.org/
- Mobx - https://mobx.js.org/
- FeathersJS - https://feathersjs.com/
- lodash/fp - https://github.com/lodash/lodash/wiki/FP-Guide
- Ant Design - https://ant.design/
- MongoDB - https://www.mongodb.com/

## Serverless configs

### Zeit Now

You can add the `MONGODB_URI` as a secret using the following now command.

```bash
now secrets add mongodb_uri <secret mongodb uri>
```

Zeit now uses a file named `now.json` to set the ENV variable `MONGODB_URI`.

```json
{
  "name": "quality-of-life-map",
  "version": 2,
  "env": {
    "MONGODB_URI": "@mongodb_uri"
  }
}
```

### AWS Lambda

TODO

## MongoDB

Mortality data set is stored using in a MongoDB collection. For local development you can use a `.env` file and set MONGODB_URI there. Data can be populated into the database by running `npm run populate`.

## Notes & TODOS

- Using MongoDB server for data store.
- Map component can be cut out and packaged into a reusable component on NPM.
- FeatherJS serverless micro service should be cut out into a reusable NPM component.
- Extend database functionality and integrate reusable checkbox based search using something like Contexture.
  - https://github.com/smartprocure/contexture
- Clean up map satellite image for Alaska and Hawaii.
- Add zoom and pan functionality to Map component.
- Sync MobX store with browser localstorage and save query settings and map controlled props?

## Map Component

Map component used the following SVG data and a script was used to rebuild the data for a packaged React component.

- https://github.com/warrengoble/convert-counties-svg2js
- https://upload.wikimedia.org/wikipedia/commons/5/59/Usa_counties_large.svg

## Dataset & Acknowledgements

IHME United States Mortality Rates by County 1980-2014: National - All. (Deaths per 100,000 population)

https://www.kaggle.com/IHME/us-countylevel-mortality

http://ghdx.healthdata.org/record/ihme-data/united-states-mortality-rates-county-1980-2014

NASA for providing the satellite overlay images.
