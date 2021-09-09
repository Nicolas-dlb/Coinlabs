import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "Bitcoin",
  notifications: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    loadNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setNotifications: (state: any, action: any) => {
      state.notifications = [...state.notifications, action.payload];
    },
    resetNotifications: (state: any) => {
      state.notifications = [];
    },
  },
});
export const selectSearch = (state: any) => state.app.search;
export const selectNotifications = (state: any) => state.app.notifications;
export const {
  setSearch,
  loadNotifications,
  setNotifications,
  resetNotifications,
} = appSlice.actions;
export default appSlice.reducer;
