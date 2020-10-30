import React from "react";

import {
  pathBorders,
  pathSeparator,
  mapWidth,
  mapHeight,
  counties as usaCounties,
} from "convert-counties-svg2json";

import background from "./background.jpg";
import County from "./County";

export { County, usaCounties, mapWidth, mapHeight };

const MapUSA = ({
  children,
  showBackground = false,
  backgroundOpacity = 0.2,
  transform,
  width,
  height,
}) => {
  const transformSVG = "matrix(" + transform.join(" ") + ")";

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

          .map {
            cursor: pointer;
          }
        `}
      </style>

      <svg
        className="overlay"
        width={width}
        height={height}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="map" transform={transformSVG}>
          {showBackground && (
            <image
              href={background}
              width={mapWidth}
              height={mapHeight}
              opacity={backgroundOpacity}
            />
          )}
          {children}
          <path d={pathBorders} fill="none" stroke="black" strokeWidth={0.25} />
          <path d={pathSeparator} fill="none" stroke="#222" strokeWidth={3} />
        </g>
      </svg>
    </div>
  );
};

export default MapUSA;
