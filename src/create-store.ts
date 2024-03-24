import { clone } from "./utilities";

export const createStore = <T extends Record<string, any>>() => {
  let oldState = {} as T;
  let state = {} as T;
  const subscribes = new Set<(oldState: T, newState: T) => void>();

  const store = {
    read() {
      return state;
    },
    subscribe(cb: (oldState: T, newState: T) => void) {
      subscribes.add(cb);
      return () => subscribes.delete(cb);
    },
  };

  const setter = (newState: Partial<T>) => {
    state = { ...state, ...newState };

    subscribes.forEach((subscribe) => subscribe(oldState, state));
    oldState = clone(state);
  };

  return (cb: (setter: (state: Partial<T>) => void) => T) => {
    state = cb(setter);
    oldState = clone(state);
    return {
      getState: store.read,
      setState: setter,
      subscribe: store.subscribe,
    };
  };
};
