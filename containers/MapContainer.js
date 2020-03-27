import React, { useState } from "react";
import { Slider } from "antd";
import { clamp } from "lodash/fp";

import MapUSA from "../components/MapUSA";

const panTransform = (transformMatrix, x, y) => {
  const newTransform = [...transformMatrix];

  newTransform[4] = x;
  newTransform[5] = y;

  return newTransform;
};

const zoomTransform = (transformMatrix, scale, x, y) => {
  const newTransform = [...transformMatrix];

  newTransform[0] *= scale;
  newTransform[1] *= scale;
  newTransform[2] *= scale;
  newTransform[3] *= scale;

  // Offset
  newTransform[4] += (1 - scale) * x;
  newTransform[5] += (1 - scale) * y;

  return newTransform;
};

const zoomClamped = value => clamp(1, 4, value);

export default ({ children = [] }) => {
  const [zoom, setZoom] = useState(1);
  const [[posX, posY], setPosition] = useState([0, 0]);

  const transformMatrix = zoomTransform(
    panTransform([1, 0, 0, 1, 0, 0], posX, posY),
    zoom,
    -posX,
    -posY
  );

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .mapContainer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .toolOverlay {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .toolZoom {
            display: flex;
            color: white;
            flex-direction: column;
            justify-content: center;
            padding: 0px 40px 0px 40px;
            flex-grow: 0.7;
            pointer-events: auto;
            background: rgba(0, 0, 0, 0.6);
            height: 120px;
          }
        `}
      </style>
      <div
        className="mapContainer"
        onMouseMove={e => {
          const { movementX, movementY, buttons } = e;

          if (buttons === 1) {
            setPosition([posX + movementX, posY + movementY]);
          }
        }}
        onWheel={({ deltaY, clientX, clientY }) => {
          setZoom(zoomClamped(zoom - deltaY * 0.01));
        }}
      >
        <MapUSA transform={"matrix(" + transformMatrix.join(" ") + ")"}>
          {children}
        </MapUSA>
      </div>
      <div className="toolOverlay">
        <div className="toolZoom">
          <div style={{ alignSelf: "center" }}>Zoom</div>
          <Slider
            value={zoom}
            min={1}
            max={4}
            step={0.01}
            onChange={v => {
              setZoom(zoomClamped(v));
            }}
            tooltipVisible
          />
        </div>
      </div>
    </div>
  );
};
