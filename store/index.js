import { reaction, toJS } from "mobx";
import { useLocalStore, useStaticRendering } from "mobx-react-lite";
import { createContext } from "react";
import { values, compact, flow, reduce } from "lodash/fp";
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
    serviceFilters.find().then(filters => {
      store.filters = reduce((a, v, i) => ({ ...a, [v]: false }), {})(filters);
    });
  }

  // Trigger when state is updated.
  // TODO Add debounce / rate limit here for now.
  reaction(
    () => [store.year, ...flow(values, compact)(store.filters)],
    async () => {
      store.results = await serviceData.find({
        query: {
          year: store.year, // FIXME move this to f
          filters: JSON.stringify(toJS(store.filters))
        }
      });
    }
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
