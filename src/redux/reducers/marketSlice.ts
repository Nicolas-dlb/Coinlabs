import { createSlice } from "@reduxjs/toolkit";

type CryptoState = {
  market: object;
  history: any;
  variation: object;
};
const initialState: CryptoState = {
  market: {
    bitcoin: {
      usd: "0.00",
      usd_market_cap: 0,
    },
    ripple: {
      usd: "0.00",
      usd_market_cap: 0,
    },
    litecoin: {
      usd: "0.00",
      usd_market_cap: 0,
    },
    neo: {
      usd: "0.00",
      usd_market_cap: 0,
    },
    ethereum: {
      usd: "0.00",
      usd_market_cap: 0,
    },
  },
  history: {},
  variation: {
    ethereum: { cap: 0, week: 0 },
    bitcoin: { cap: 0, week: 0 },
    ripple: { cap: 0, week: 0 },
    litecoin: { cap: 0, week: 0 },
    neo: { cap: 0, week: 0 },
  },
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
  },
});

export const selectMarket = (state: any) => state.market.market;
export const selectHistory = (state: any) => state.market.history;
export const selectVariation = (state: any) => state.market.variation;
export const selectTime = (state: any) => state.market.time;
export const { loadCrypto, loadHistory, setVariation } = marketSlice.actions;
export default marketSlice.reducer;
