import React, { useState } from "react";
import ReactResizeDetector from "react-resize-detector";

import {
  pathBorders,
  pathSeparator,
  mapWidth,
  mapHeight,
  counties as usaCounties
} from "./usaCounties.json"; // Generated from converter. https://github.com/warrengoble/convert-counties-svg2js

import background from "./background.jpg";
import County from "./County";

export default ({ children, backgroundOpacity = 0.2 }) => {
  const [{ width: w, height: h }, setSize] = useState({
    width: mapWidth,
    height: mapHeight
  });

  return (
    <div className="container">
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
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
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        width={w}
        height={h}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <image
            href={background}
            width={mapWidth}
            height={mapHeight}
            opacity={backgroundOpacity}
          />
          {children}
          <path d={pathBorders} fill="none" stroke="black" strokeWidth={1} />
          <path d={pathSeparator} fill="none" stroke="black" strokeWidth={1} />
        </g>
      </svg>
    </div>
  );
};

export { County, usaCounties };
