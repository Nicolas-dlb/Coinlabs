import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
  crypto: ["ETH", "BTC", "XRP"],
  time: "Month",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setCrypto(state, action) {
      state.crypto = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    resetTime(state) {
      state.time = "";
    },
  },
});
export const selectCurrency = (state: any) => state.app.currency;
export const selectCrypto = (state: any) => state.app.crypto;
export const selectTime = (state: any) => state.app.time;
export const { setCurrency, setCrypto, setTime, resetTime } = appSlice.actions;
export default appSlice.reducer;
