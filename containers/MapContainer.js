import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Slider } from "antd";
import { clamp } from "lodash/fp";
import ReactResizeDetector from "react-resize-detector";

import MapUSA, { mapWidth, mapHeight } from "../components/MapUSA";
import { useStore } from "../store";

export default observer(
  ({
    children = [],
    minZoom = 0.5,
    maxZoom = 5,
    // zoom = 1,
    // position = [0, 0],
    showMapBackground = false,
  }) => {
    const store = useStore();
    const mapRef = useRef();

    const { mapZoom: zoom, mapPosition: [posX, posY] = [] } = store;
    const setZoom = (v) => {
      store.mapZoom = v;
    };

    const setPosition = (v) => {
      store.mapPosition = v;
    };

    //
    const [{ width, height }, setSize] = useState({
      width: 200,
      height: 100,
    });

    const setZoomWrapper = (zoomValue) => {
      const zoomValueClamped = clamp(minZoom, maxZoom, zoomValue);
      const zoomDelta = zoom - zoomValueClamped;

      setZoom(zoomValueClamped);
      setPositionWrapper([
        posX + (zoomDelta * (width / 2)) / 2,
        posY + (zoomDelta * (height / 2)) / 2,
      ]);
    };

    const setPositionWrapper = ([x, y]) => {
      setPosition([x, y]);
    };

    // TODO Move this to different scope?
    useEffect(() => {
      const { current: { clientWidth, clientHeight } = {} } = mapRef;

      setPosition([0, (clientHeight / 2 - mapHeight / 2) / 2]);
      setZoom(Math.min(clientWidth / mapWidth, clientHeight / mapHeight));
    }, []);

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
          onWheel={({ deltaY }) => {
            setZoomWrapper(zoom - deltaY * 0.01);
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
      </div>
    );
  }
);
