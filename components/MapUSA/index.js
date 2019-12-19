import React, { useState } from "react";
import { entries, values } from "lodash/fp";
import ReactResizeDetector from "react-resize-detector";

// import counties
import usaCounties from "./usaCounties";
import background from "./background.jpg";

// TODO Image dimension are hard coded.  Might want to make more dynamic for the future
const width = 989.98;
const height = 627.07;

export default ({ countyIds = [] }) => {
  const [{ width: w, height: h }, setSize] = useState({ width, height });
  // const scale = Math.min(w / width, h / height);

  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .overlay {
            position: absolute;
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
      <svg
        className="overlay"
        viewBox={`0 0 990 627`}
        width={w}
        height={h}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <image href={background} width="990" height="627" opacity={0.5} />
          {entries(usaCounties).map(([key, { path }]) => {
            return (
              <path
                key={key}
                d={path}
                fillOpacity={0.2}
                fill="red"
                strokeWidth={1}
                strokeOpacity={0.2}
                stroke="black"
              ></path>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
