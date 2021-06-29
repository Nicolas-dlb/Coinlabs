import { createSlice } from "@reduxjs/toolkit";

type CryptoState = {
  market: object;
  history: any;
  variation: object;
  time: string;
};
const initialState: CryptoState = {
  market: {},
  history: {},
  variation: { ethereum: 0, bitcoin: 0, ripple: 0, litecoin: 0, neo: 0 },
  time: "month",
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    loadCrypto: (state: CryptoState, action: any) => {
      state.market = { ...action.payload };
    },
    loadHistory: (state: CryptoState, action: any) => {
      state.history = { ...state.history, ...action.payload };
    },
    setVariation: (state: CryptoState, action: any) => {
      state.variation = { ...state.variation, ...action.payload };
    },
    setTime: (state: CryptoState, action: any) => {
      state.time = action.payload;
    },
  },
});

export const selectMarket = (state: any) => state.market.market;
export const selectHistory = (state: any) => state.market.history;
export const selectVariation = (state: any) => state.market.variation;
export const selectTime = (state: any) => state.market.time;
export const { loadCrypto, loadHistory, setVariation, setTime } =
  marketSlice.actions;
export default marketSlice.reducer;
