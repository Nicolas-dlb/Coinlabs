import { combineReducers, createStore } from "@reduxjs/toolkit";
import marketReducer from "./reducers/marketSlice";
import walletsReducer from "./reducers/walletsSlice";
import appReducer from "./reducers/appSlice";
import userReducer from "./reducers/userSlice";

export default function createTestStore() {
  const store = createStore(
    combineReducers({
      market: marketReducer,
      wallets: walletsReducer,
      app: appReducer,
      user: userReducer,
    })
  );
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}
