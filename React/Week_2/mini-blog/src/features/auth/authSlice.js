import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    email: null,
    userRole: "guest", // ou "editor" / "admin" pour les défis
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.email = action.payload.email;
      state.userRole = action.payload.role ?? "guest";
    },
    logout(state) {
      state.isAuth = false;
      state.email = null;
      state.userRole = "guest";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
