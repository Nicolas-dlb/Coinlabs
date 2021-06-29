import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  profilPic: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.email;
    },
    logout: (state) => {
      state.userName = null;
      state.userEmail = null;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    setProfilPic: (state, action) => {
      state.profilPic = action.payload;
    },
    resetProfilPic: (state) => {
      state.profilPic = null;
    },
  },
});
export const selectUserName = (state: any) => state.user.userName;
export const selectUserEmail = (state: any) => state.user.userEmail;
export const selectProfilPic = (state: any) => state.user.profilPic;
export const { login, logout, setUsername, setProfilPic, resetProfilPic } =
  userSlice.actions;
export default userSlice.reducer;
