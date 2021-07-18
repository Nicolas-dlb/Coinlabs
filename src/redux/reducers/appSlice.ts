import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "Bitcoin",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const selectSearch = (state: any) => state.app.search;
export const { setSearch } = appSlice.actions;
export default appSlice.reducer;
