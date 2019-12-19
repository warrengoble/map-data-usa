import React from "react";
import { useObserver } from "mobx-react-lite";
import { entries } from "lodash/fp";

import MapUSA, { County } from "../components/MapUSA";
import SliderControl from "../components/SliderControl";
import ToggleControl from "../components/ToggleControl";

import { useStore } from "../store";

export default () => {
  const store = useStore();

  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            display: flex;
            width: 100vw;
            height: 100vh;
            background: #222;
          }

          .optionsContainer {
            display: flex;
            flex-direction: row;
            width: 100%;
            font-weight: bold;
            color: #bbb;
            user-select: none;
            z-index: 1;
          }

          .optionsCheckBoxContainer {
            display: flex;
            flex-direction: column;
            width: 300px;
            overflow: auto;
            background: #333;
            box-shadow: 2px 0 10px 0px black;
          }

          .optionsMainContainer {
            display: flex;
            position: relative;
            flex-direction: column;
            flex-grow: 1;
          }

          .optionsSliderContainer {
            width: 100%;
            position: absolute;
            background: rgba(0, 0, 0, 0.6);
            z-index: 2;
          }
        `}
      </style>
      {useObserver(() => {
        return (
          <div className="optionsContainer">
            <div className="optionsCheckBoxContainer">
              {entries(store.filters).map(([key, checked]) => (
                <ToggleControl
                  key={key}
                  title={key}
                  onChange={() => store.toggleFilter(key)}
                  checked={checked}
                />
              ))}
            </div>
            <div className="optionsMainContainer">
              <div className="optionsSliderContainer">
                <SliderControl
                  value={store.year}
                  min={1980}
                  max={2014}
                  step={null}
                  onChange={store.updateYear}
                  marks={[
                    1980,
                    1985,
                    1990,
                    1995,
                    2000,
                    2005,
                    2010,
                    2014
                  ].reduce(
                    (a, v, i) => ({
                      ...a,
                      [v]: {
                        style: {
                          color: "#bbb"
                        },
                        label: v
                      }
                    }),
                    {}
                  )}
                  dots
                />
              </div>
              <MapUSA>
                {store.results.map(({ id, value }) => (
                  <County key={id} id={id} fillOpacity={value} fill="red" />
                ))}
              </MapUSA>
            </div>
          </div>
        );
      })}
    </div>
  );
};
