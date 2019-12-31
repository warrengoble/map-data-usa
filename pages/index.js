import React from "react";
import { useObserver } from "mobx-react-lite";
import { entries, map, flow, reduce } from "lodash/fp";

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
        `}
      </style>
      {useObserver(() => {
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
            <MapUSA>
              {map(({ id, value }) => (
                <County key={id} id={id} fillOpacity={value} fill="red" />
              ))(store.results)}
            </MapUSA>
          </>
        );
      })}
    </div>
  );
};
