import { reaction } from "mobx";
import { useLocalStore, useStaticRendering } from "mobx-react-lite";
import { createContext } from "react";
import { values } from "lodash/fp";

import createStore from "./createStore";
import feathers from "./feathers";

// Handle SSR
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const service = feathers();
  const store = useLocalStore(createStore(service));

  // Get filter values from database
  if (!isServer) {
    service.find({ query: { filters: true } }).then(values => {
      store.filters = values.reduce((a, v, i) => ({ ...a, [v]: true }), {});
    });
  }

  // Trigger when state is updated
  reaction(
    () => [store.year, ...values(store.filters).map(v => v)],
    async () => {
      store.results = await service.find({ query: {} });
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
