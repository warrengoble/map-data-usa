import { reaction } from "mobx";
import { useLocalStore, useStaticRendering } from "mobx-react-lite";
import { createContext } from "react";

import createStore from "./createStore";
import feathers from "./feathers";

// Handle SSR
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const service = feathers();
  const store = useLocalStore(createStore(service));

  // Trigger when curtain state is updated
  reaction(
    () => [store.year],
    async titles => {
      const res = await service.find({ query: { month: store.year } });
      
      console.log("reaction", res);
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
