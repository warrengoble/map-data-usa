import { useLocalStore, useStaticRendering } from "mobx-react-lite";
import { createContext, useCallback } from "react";
import createStore from "./createStore";

// Handle SSR
const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);

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
