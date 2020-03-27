import React from "react";
import { useObserver } from "mobx-react-lite";
import { entries, map, flow, values, reduce, every } from "lodash/fp";
import { Button } from "antd";

import MapUSA, { County } from "../components/MapUSA";
import SliderControl from "../components/SliderControl";
import ToggleControl from "../components/ToggleControl";

import MapContainer from "../containers/MapContainer";

import Splash from "../components/Splash";
import LoaderSpin from "../components/LoaderSpin";

import { useStore } from "../store";

export default () => {
  const store = useStore();

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            display: flex;
            flex-direction: row;
            width: 100vw;
            height: 100vh;
            background: #222;
            user-select: none;
          }

          .optionsContainer {
            display: flex;
            flex-direction: column;
            font-weight: bold;
            color: #bbb;
            box-shadow: 2px 0 10px 0px black;
          }

          .optionsCheckBoxContainer {
            display: flex;
            flex-direction: column;
            width: 300px;
            overflow: auto;
            background: #333;
          }

          .optionsSliderContainer {
            background: rgba(0, 0, 0, 0.6);
          }

          .optionsButtons {
            display: flex;
            justify-content: center;
          }

          .mapGroup {
            position: relative;
            flex: 1;
          }
        `}
      </style>
      {useObserver(() => {
        const showSplash = flow(
          values,
          every(v => !v)
        )(store.filters);

        return (
          <>
            <div className="optionsContainer">
              <div className="optionsSliderContainer">
                <SliderControl
                  value={store.year}
                  min={1980}
                  max={2014}
                  step={null}
                  onChange={store.updateYear}
                  marks={reduce(
                    (a, v, i) => ({
                      ...a,
                      [v]: {
                        style: {
                          color: "#bbb",
                          fontSize: "0.75em"
                        },
                        label: v
                      }
                    }),
                    {}
                  )([1980, 1985, 1990, 1995, 2000, 2005, 2010, 2014])}
                  dots
                />
              </div>
              <div className="optionsButtons">
                <Button
                  style={{ flex: 0.5 }}
                  onClick={() => store.clearFilters()}
                >
                  Clear
                </Button>
                <Button
                  style={{ flex: 0.5 }}
                  onClick={() => store.selectAllFilters()}
                >
                  Select All
                </Button>
              </div>
              <div className="optionsCheckBoxContainer">
                {flow(
                  entries,
                  map(([key, checked]) => (
                    <ToggleControl
                      key={key}
                      title={key}
                      onChange={() => store.toggleFilter(key)}
                      checked={checked}
                    />
                  ))
                )(store.filters)}
              </div>
            </div>
            <div className="mapGroup">
              <MapContainer>
                {!showSplash &&
                  flow(
                    reduce(
                      (
                        {
                          values = [],
                          minValue = Infinity,
                          maxValue = -Infinity
                        },
                        { _id: id, value }
                      ) => ({
                        values: [...values, { id, value }],
                        minValue: value < minValue ? value : minValue,
                        maxValue: value > maxValue ? value : maxValue
                      }),
                      {}
                    ),
                    ({ values = [], minValue, maxValue }) =>
                      map(({ id, value }) => ({
                        id,
                        value: (value - minValue) / (maxValue - minValue)
                      }))(values),
                    map(({ id, value }) => (
                      <County key={id} id={id} fillOpacity={value} fill="red" />
                    ))
                  )(store.results)}
              </MapContainer>
              {showSplash && <Splash />}
              {store.loading && <LoaderSpin />}
            </div>
          </>
        );
      })}
    </div>
  );
};
