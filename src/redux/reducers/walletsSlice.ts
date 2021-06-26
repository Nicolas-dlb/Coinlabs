import { createSlice } from "@reduxjs/toolkit";

type WalletsState = {
  wallets: any;
  balanceHistory: any;
  walletHistory: any;
  cryptoHistory: any;
  incomeHistory: any;
  expensesHistory: any;
};
const initialState: WalletsState = {
  wallets: {
    usd: 20000,
    eur: 0,
    gbp: 0,
    mxn: 0,
    ethereum: 0,
    ethereumPrice: 0,
    neo: 0,
    neoPrice: 0,
    litecoin: 0,
    litecoinPrice: 0,
    bitcoin: 0,
    bitcoinPrice: 0,
    ripple: 0,
    ripplePrice: 0,
    TotalCrypto: 0,
    total: 20000,
  },
  balanceHistory: [],
  walletHistory: [],
  cryptoHistory: [],
  incomeHistory: [],
  expensesHistory: [],
};

function isIterable(value: any) {
  return Symbol.iterator in Object(value);
}

const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    loadWallets: (state: WalletsState, action: any) => {
      state.wallets = {
        ...state.wallets,
        ...action.payload,
        eur: state.wallets.usd * 0.82366545,
        gbp: state.wallets.usd * 0.710764,
        mxn: state.wallets.usd * 19.945724,
      };
    },
    setWallets: (state: WalletsState, action: any) => {
      state.wallets = action.payload.usd
        ? {
            ...state.wallets,
            ...action.payload,

            eur: action.payload.usd * 0.82366545,
            gbp: action.payload.usd * 0.710764,
            mxn: action.payload.usd * 19.945724,
          }
        : {
            ...state.wallets,
            ...action.payload,
          };
    },
    setBalanceHistory: (state: WalletsState, action: any) => {
      if (isIterable(state.balanceHistory)) {
        state.balanceHistory = [...state.balanceHistory, action.payload];
      } else {
        state.balanceHistory = [action.payload];
      }
    },
    loadBalanceHistory: (state: WalletsState, action: any) => {
      state.balanceHistory = action.payload;
    },
    resetBalanceHistory: (state: WalletsState) => {
      state.balanceHistory = [];
    },
    setWalletHistory: (state: WalletsState, action: any) => {
      if (isIterable(state.walletHistory)) {
        state.walletHistory = [action.payload, ...state.walletHistory];
      } else {
        state.walletHistory = [action.payload];
      }
    },
    resetWalletHistory: (state: WalletsState) => {
      state.walletHistory = [];
    },
    loadWalletHistory: (state: WalletsState, action: any) => {
      state.walletHistory = action.payload;
    },
    setCryptoHistory: (state: WalletsState, action: any) => {
      if (isIterable(state.cryptoHistory)) {
        state.cryptoHistory = [...state.cryptoHistory, action.payload];
      } else {
        state.cryptoHistory = [action.payload];
      }
    },
    loadCryptoHistory: (state: WalletsState, action: any) => {
      state.cryptoHistory = action.payload;
    },
    resetCryptoHistory: (state: WalletsState) => {
      state.cryptoHistory = [];
    },
    setIncomeHistory: (state: WalletsState, action: any) => {
      if (isIterable(state.incomeHistory)) {
        state.incomeHistory = [...state.incomeHistory, action.payload];
      } else {
        state.incomeHistory = [action.payload];
      }
    },
    loadIncomeHistory: (state: WalletsState, action: any) => {
      state.incomeHistory = action.payload;
    },
    resetIncomeHistory: (state: WalletsState) => {
      state.incomeHistory = [];
    },
    setExpensesHistory: (state: WalletsState, action: any) => {
      if (isIterable(state.expensesHistory)) {
        state.expensesHistory = [...state.expensesHistory, action.payload];
      } else {
        state.expensesHistory = [action.payload];
      }
    },
    loadExpensesHistory: (state: WalletsState, action: any) => {
      state.expensesHistory = action.payload;
    },
    resetExpensesHistory: (state: WalletsState) => {
      state.expensesHistory = [];
    },
    
  },
});

export const selectWallets = (state: any) => state.wallets.wallets;
export const selectBalanceHistory = (state: any) =>
  state.wallets.balanceHistory;
  export const selectWalletHistory = (state: any) => state.wallets.walletHistory;
export const selectCryptoHistory = (state: any) => state.wallets.cryptoHistory;
export const selectIncomeHistory = (state: any) => state.wallets.incomeHistory;
export const selectExpensesHistory = (state: any) => state.wallets.expensesHistory;
export const {
  loadWallets,
  setWallets,
  setBalanceHistory,
  loadBalanceHistory,
  resetBalanceHistory,
  setWalletHistory,
  resetWalletHistory,
  loadWalletHistory,
  setIncomeHistory,
  resetIncomeHistory,
  loadIncomeHistory,
  setExpensesHistory,
  resetExpensesHistory,
  loadExpensesHistory,
  setCryptoHistory,
  resetCryptoHistory,
  loadCryptoHistory,
} = walletsSlice.actions;
export default walletsSlice.reducer;
