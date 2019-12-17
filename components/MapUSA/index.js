import React, { useState } from "react";
import { entries, values } from "lodash/fp";
import ReactResizeDetector from "react-resize-detector";

// import counties
import usaCounties from "./usaCounties";

// TODO Image dimension are hard coded.  Might want to make more dynamic for the future
const width = 989.98;
const height = 627.07;

export default ({ countyIds = [] }) => {
  const [{ width: w, height: h }, setSize] = useState({ width, height });

  console.log(w, h);
  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            display: flex;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .background {
            background: black;
          }

          .overlay {
            // background: red;
          }
        `}
      </style>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width, height) => {
          setSize({ width, height });
        }}
      />
      <div className="background"></div>
      <svg
        className="overlay"
        viewBox={`0 0 990 627`}
        width={w}
        height={h}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="counties">
          {values(usaCounties)
            // .slice(0, 100)
            .map(({ path }) => {
              return <path d={path} fillOpacity={0.4} fill="red"></path>;
            })}
        </g>
      </svg>
    </div>
  );
};
