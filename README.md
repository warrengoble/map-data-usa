# Quality of Life Map (USA)

## Description

This is an application demo and boilerplate to create a visual map of the USA with filters that can be used to display heatmap data for Counties and States.

## Design goals

- Use serverless lambda type hosting such as Zeit Now and AWS Lambda.
- Use FeathersJS and it's adapters for data stores. This will need to work wih serverless micro services API . (Incomplete)
- Try and use SSR (Server Side Render) when available.
- MobX global context for state management.
- Tree based querying for nested data. (Incomplete)

## Demo

https://quality-of-life-map.now.sh

## Packages

- NextJS - https://nextjs.org/
- React - https://reactjs.org/
- Mobx - https://mobx.js.org/README.html
- FeathersJS - https://feathersjs.com/
- lodash/fp - https://github.com/lodash/lodash/wiki/FP-Guide

## Dataset & Acknowledgements

IHME United States Mortality Rates by County 1980-2014: National - All. (Deaths per 100,000 population)

https://www.kaggle.com/IHME/us-countylevel-mortality

http://ghdx.healthdata.org/record/ihme-data/united-states-mortality-rates-county-1980-2014

## Notes & TODOS

- Figure out what to do with datastore working with serverless micro api and create working example. Micro API documentation here. 
- Map component can be cut out and packaged into a reusable component on NPM.
- FeatherJS serverless micro service is incomplete and should be cut out into a reusable component if possible. Will need to test some existing DB adapters. Some of these might not work with the serverless nature and require a re-write.
- Extend database functionality and integrate reusable checkbox based search using something like Contexture. https://github.com/smartprocure/contexture
- Clean up map satellite image for Alaska and Hawaii.
- Add Zoom and pan functionality to map component.
- Sync MobX store with browser localstorage and save query settings and map controlled props?

## Map Component

Map component used the following SVG data and a script was used to rebuild the data for a packaged React component.

https://upload.wikimedia.org/wikipedia/commons/5/59/Usa_counties_large.svg

https://github.com/warrengoble/convert-counties-svg2js
