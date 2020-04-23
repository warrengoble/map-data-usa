import React from "react";
import { useObserver } from "mobx-react-lite";
import { get, set } from "mobx";
import { pipe, map, toPairs, compact, reduce, values, every } from "lodash/fp";
import {
  GithubOutlined,
  CodeOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useRouter } from "next/router";

import { County } from "../components/MapUSA";
import FilterCheckBox from "../components/FilterCheckBox";
import FilterSlider from "../components/FilterSlider";
import Splash from "../components/Splash";
import LoaderSpin from "../components/LoaderSpin";

import MapContainer from "../containers/MapContainer";
import FilterContainer from "../containers/FilterContainer";

import { useStore } from "../store";

export default () => {
  const router = useRouter();
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
            background: #111;
            user-select: none;
          }

          .optionsContainer {
            display: flex;
            flex-direction: column;
            font-weight: bold;
            color: #bbb;
            box-shadow: 2px 0 10px 0px black;
            width: 300px;
            overflow: auto;
          }

          .mapGroup {
            position: relative;
            flex: 1;
          }

          .codeIcon {
            position: absolute;
            top: 0;
            right: 0;
            padding: 5px;
          }

          .mapControls {
            position: absolute;
            top: 0;
            left: 0;
            padding: 5px;
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
                      <FilterContainer name={name}>
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
                          onClearFilters={(name) => {
                            store.clearFilters(name);
                          }}
                          onSelectAllFilters={(name) => {
                            store.selectAllFilters(name);
                          }}
                        />
                      </FilterContainer>
                    );
                  }

                  if (ui === "slider" && type === "number") {
                    return (
                      <FilterSlider
                        name={name}
                        filterValues={filterValues}
                        onChange={(key) => {
                          // Select only single
                          console.log("key", key, name);
                        }}
                      />
                    );
                  }
                }),
                compact
              )(store.filters)}
            </div>
            <div className="mapGroup">
              <MapContainer showMapBackground={store.showMapBackground}>
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
              <div className="codeIcon">
                <GithubOutlined
                  style={{ color: "white", fontSize: "2em" }}
                  onClick={() =>
                    router.push("//github.com/warrengoble/quality-of-life-map")
                  }
                />
              </div>
              <div className="mapControls">
                <Tooltip placement="right" title={"Toggle Map Background"}>
                  <Button
                    type={store.showMapBackground ? "primary" : "default"}
                    onClick={() => {
                      store.showMapBackground = !store.showMapBackground;
                    }}
                  >
                    <SwitcherOutlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

/*
<div className={mapControls}>
                <Tooltip placement="right" title={"Toggle Map Background"}>
                  <Button
                    type={store.showMapBackground ? "primary" : "default"}
                    onClick={() => {
                      store.showMapBackground = !store.showMapBackground;
                    }}
                  >
                    <SwitcherOutlined />
                  </Button>
                </Tooltip>
              </div>
              */
