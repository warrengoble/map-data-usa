import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Slider } from "antd";
import { clamp } from "lodash/fp";
import ReactResizeDetector from "react-resize-detector";
import { SwitcherOutlined, AimOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

import MapUSA, { mapWidth, mapHeight } from "../components/MapUSA";
import { useStore } from "../store";

export default observer(({ children, minZoom = 0.5, maxZoom = 5 }) => {
  const store = useStore();
  const mapRef = useRef();

  const {
    mapZoom: zoom,
    mapPosition: [posX, posY] = [],
    showMapBackground = false,
  } = store;

  const [{ width, height }, setSize] = useState({
    width: 200,
    height: 100,
  });

  const setZoomWrapper = (zoomValue, x = width / 2, y = height / 2) => {
    const zoomValueClamped = clamp(minZoom, maxZoom, zoomValue);

    store.mapZoom = zoomValueClamped;
    setPositionWrapper([
      x - ((x - posX) / zoom) * zoomValueClamped,
      y - ((y - posY) / zoom) * zoomValueClamped,
    ]);
  };

  const setPositionWrapper = ([x, y]) => {
    store.mapPosition = [x, y];
  };

  const resetView = () => {
    const { current: { clientWidth, clientHeight } = {} } = mapRef;

    if (clientWidth / mapWidth < clientHeight / mapHeight) {
      const initialZoom = clientWidth / mapWidth;

      store.mapPosition = [0, (clientHeight / 2 - mapHeight / 2) / initialZoom];
      store.mapZoom = initialZoom;
    } else {
      const initialZoom = clientHeight / mapHeight;

      store.mapPosition = [(clientWidth / 2 - mapWidth / 2) / initialZoom, 0];
      store.mapZoom = initialZoom;
    }
  };

  useEffect(() => resetView(), []);

  const transformMatrix = [zoom, 0, 0, zoom, posX, posY];
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
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0px 40px 0px 40px;
            flex-grow: 0.7;
            pointer-events: auto;
            background: rgba(0, 0, 0, 0.6);
            height: 3em;
          }

          .zoomSlider {
            flex: 1;
          }

          .mapControls {
            position: absolute;
            top: 0;
            left: 0;
            padding: 5px;
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
      <div
        ref={mapRef}
        className="mapContainer"
        onMouseMove={(e) => {
          const { movementX, movementY, buttons } = e;

          if (buttons === 1) {
            setPositionWrapper([posX + movementX, posY + movementY]);
          }
        }}
        onWheel={(e) => {
          const { clientX, clientY, deltaY, deltaMode } = e;
          const { current: parentContainer } = mapRef;
          const { left = 0, top = 0 } = parentContainer.getBoundingClientRect();

          const x = clientX - left;
          const y = clientY - top;

          const deltaNormalized = deltaY * 0.001;
          const deltaAdjusted =
            deltaMode === 1
              ? deltaNormalized * 20 // LINE
              : deltaNormalized; // PIXEL

          setZoomWrapper(zoom - deltaAdjusted, x, y);
        }}
      >
        <MapUSA
          transform={"matrix(" + transformMatrix.join(" ") + ")"}
          width={width}
          height={height}
          showBackground={showMapBackground}
        >
          {children}
        </MapUSA>
      </div>
      <div className="toolOverlay">
        <div className="toolZoom">
          <div style={{ alignSelf: "center" }}>Zoom</div>
          <div className="zoomSlider">
            <Slider
              value={zoom}
              min={minZoom}
              max={maxZoom}
              step={0.01}
              onChange={(v) => {
                setZoomWrapper(v);
              }}
              tooltipVisible={false}
            />
          </div>
        </div>
      </div>
      <div className="mapControls">
        <Tooltip placement="bottom" title={"Toggle Map Background"}>
          <Button
            type={store.showMapBackground ? "primary" : "default"}
            onClick={() => {
              store.showMapBackground = !store.showMapBackground;
            }}
          >
            <SwitcherOutlined />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" title={"Center Map"}>
          <Button onClick={() => resetView()}>
            <AimOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
});
