import { reaction, toJS } from "mobx";
import { useLocalStore, useStaticRendering } from "mobx-react-lite";
import { createContext } from "react";
import { values, pipe, map, every, some } from "lodash/fp";
import { debounce } from "lodash";

import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

import createStore from "./createStore";

// Handle SSR
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const app = feathers();
  const restClient = rest("/api");

  app.configure(restClient.axios(axios));

  // Service endpoints
  const serviceData = app.service("data");
  const serviceFilters = app.service("filters");

  const store = useLocalStore(createStore());

  // Get filter values from database
  if (!isServer) {
    serviceFilters.find().then((filters) => {
      store.filters = filters;
    });
  }

  // Trigger when filters are updated.
  reaction(
    () => [
      ...pipe(
        values,
        map(({ filterValues }) => filterValues)
      )(store.filters),
    ],
    debounce(async () => {
      if (
        !pipe(
          values,
          map(({ filterValues }) =>
            pipe(
              values,
              some((v) => v === true)
            )(filterValues)
          ),
          every((v) => v)
        )(store.filters)
      ) {
        return;
      }

      store.loading = true;
      store.results = await serviceData.find({
        query: {
          filters: JSON.stringify(toJS(store.filters)),
        },
      });
      store.loading = false;
    }, 500)
  );

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }

  return store;
};
