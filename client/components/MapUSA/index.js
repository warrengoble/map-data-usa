import React, { useState } from "react";
import { entries, values } from 'lodash/fp';

// import counties
import usaCounties from './usaCounties';

// TODO Image dimension are hard coded.  Might want to make more dynamic for the future

export default ({ countyIds = [] }) => {
  //

  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            display: flex;
            position: relative;
          }

          .background {
            background: red;c
          }

          .overlay {
          }
        `}
      </style>
      <div className="background"></div>
      <svg
        className="overlay"
        width="989.98"
        height="627.07"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="counties" transform="translate(0 .10698)">
            {values(usaCounties).slice(0,100).map(({ path }) => {
               return <path d={path} fillOpacity={0.2}></path>
            })}
        </g>
      </svg>
    </div>
  );
};
