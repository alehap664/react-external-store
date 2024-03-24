export type Store<T> = {
  getState: () => T;
  setState: (state: Partial<T>) => void;
  subscribe: (cb: () => void) => () => boolean;
};
