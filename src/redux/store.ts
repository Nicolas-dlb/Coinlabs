import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./reducers/marketSlice";
import walletsReducer from "./reducers/walletsSlice";
import appReducer from "./reducers/appSlice";
import userReducer from "./reducers/userSlice";

export default configureStore({
  reducer: {
    market: marketReducer,
    wallets: walletsReducer,
    app: appReducer,
    user: userReducer,
  },
});
