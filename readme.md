## Simple State Management with React Hook `useSyncExternalStore`


### Usage Guide
- #### Initialize a store with initial values, including state and actions.
```ts
type State = {
  users: { id: number; name: string }[];
};
type Action = {
  addUser: (user: State["users"][number]) => void;
};

const store = createStore<State & Action>()((set) => ({
  users: [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ],
  addUser(user) {
    const { users } = store.getState();
    users.push(user);
    set({ users });
  },
}));
```
- #### Create a selector.
```ts
const useUserStore = createSelector(store);
```

### Usage within a Component
```ts
function App() {
  // Declare a store.
  const { users } = useStore();
  // Declare a store with a selector.
  const addUser = useStore((state) => state.addUser);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button
        onClick={() => addUser({ id: Math.random(), name: "New user added" })}
      >
        Add a User
      </button>
    </div>
  );
}

export default App;
```