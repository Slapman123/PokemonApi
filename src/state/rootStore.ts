import { types, Instance } from "mobx-state-tree";
import React, { createContext } from "react";
import { RootModel, RootModelInitialState } from "./Models/RootModel";

const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);

export const StoreProvider = RootStoreContext.Provider;
export const rootStore = types
  .model({ root: RootModel })
  .create({ root: RootModelInitialState });

export function useMst() {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
