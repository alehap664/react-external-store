import { useSyncExternalStore } from "react";
import { Store } from "./types";

export const createSelector = <T>(store: Store<T>) => {
  function selector(): T;
  function selector<S>(selector: (state: T) => S): S;
  function selector<S>(selector?: (state: T) => S) {
    return useSyncExternalStore(store.subscribe, () => {
      const snap = store.getState();
      return selector ? selector(snap) : snap;
    });
  }
  return selector;
};
