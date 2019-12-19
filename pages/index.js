import React from "react";
import { useObserver } from "mobx-react-lite";
import { entries } from "lodash/fp";

import MapUSA from "../components/MapUSA";
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
            background: #111;
            position: relative;
          }

          .optionsContainer {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100%;
            font-weight: bold;
            color: #bbb;
            user-select: none;
            z-index: 1;
          }
        `}
      </style>
      <div className="optionsContainer">
        {useObserver(() => {
          return (
            <>
              <SliderControl
                title="Adjust Date"
                value={store.year}
                min={1980}
                max={2014}
                step={null}
                onChange={store.updateYear}
                marks={[1980, 1985, 1990, 1995, 2000, 2005, 2010, 2014].reduce(
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
              {entries(store.filters).map(([key, checked]) => (
                <ToggleControl
                  key={key}
                  title={key}
                  onChange={() => store.toggleFilter(key)}
                  checked={checked}
                />
              ))}
            </>
          );
        })}
      </div>
      <MapUSA />
    </div>
  );
};
