import React, { useState } from "react";
import ReactResizeDetector from "react-resize-detector";

// import counties
import usaCounties, { pathBorders, pathSeparator } from "./usaCounties"; // Generated from converter. https://github.com/warrengoble/convert-counties-svg2js
import background from "./background.jpg";
import County from "./County";

// TODO Image dimension are hard coded.  Might want to make more dynamic for the future
const width = 989.98;
const height = 627.07;

export default ({ children }) => {
  const [{ width: w, height: h }, setSize] = useState({ width, height });

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
          {children}
          <path d={pathBorders} fill="none" stroke="black" strokeWidth={1} />
          <path d={pathSeparator} fill="none" stroke="black" strokeWidth={1} />
        </g>
      </svg>
    </div>
  );
};

export { County, usaCounties };
