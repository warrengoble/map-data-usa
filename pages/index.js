import React from "react";
import { useObserver } from "mobx-react-lite";
import { get, set } from "mobx";
import { pipe, map, toPairs, compact, reduce, values, every } from "lodash/fp";

import { County } from "../components/MapUSA";
import FilterCheckBox from "../components/FilterCheckBox";
import FilterSlider from "../components/FilterSlider";

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
            flex-self: 20%;
          }

          .mapGroup {
            position: relative;
            flex: 1;
          }
        `}
      </style>
      {useObserver(() => {
        const showSplash = pipe(
          toPairs,
          reduce(
            (a, [k, { filterValues = {} }]) => [...a, ...values(filterValues)],
            []
          ),
          every((v) => !v)
        )(store.filters);

        return (
          <>
            <div className="optionsContainer">
              {pipe(
                toPairs,
                map(([name, { type, ui, filterValues }]) => {
                  if (ui === "checkbox") {
                    return (
                      <FilterCheckBox
                        name={name}
                        filterValues={filterValues}
                        onChange={(key) => {
                          const filter = get(store.filters, name);
                          set(store.filters, name, {
                            ...filter,
                            filterValues: {
                              ...filter.filterValues,
                              [key]: !filter.filterValues[key],
                            },
                          });
                        }}
                      />
                    );
                  }

                  if (ui === "slider" && type === "number") {
                    return (
                      <FilterCheckBox
                        name={name}
                        filterValues={filterValues}
                        onChange={(key) => {
                          const filter = get(store.filters, name);
                          set(store.filters, name, {
                            ...filter,
                            filterValues: {
                              ...filter.filterValues,
                              [key]: !filter.filterValues[key],
                            },
                          });
                        }}
                      />
                    );
                    // return (
                    //   <FilterSlider
                    //     name={name}
                    //     filterValues={filterValues}
                    //     onChange={(key) => {
                    //       // Select only single
                    //       console.log("key", key, name);
                    //     }}
                    //   />
                    // );
                  }
                }),
                compact
              )(store.filters)}
            </div>
            <div className="mapGroup">
              <MapContainer>
                {!showSplash &&
                  pipe(
                    reduce(
                      (
                        {
                          values = [],
                          minValue = Infinity,
                          maxValue = -Infinity,
                        },
                        { _id: id, value }
                      ) => ({
                        values: [...values, { id, value }],
                        minValue: value < minValue ? value : minValue,
                        maxValue: value > maxValue ? value : maxValue,
                      }),
                      {}
                    ),
                    ({ values = [], minValue, maxValue }) =>
                      map(({ id, value }) => ({
                        id,
                        value: (value - minValue) / (maxValue - minValue),
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
