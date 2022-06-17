import { createSlice } from "@reduxjs/toolkit";
import { setAuthTokenToServiceInstance } from "../../service";

let initialState = {
  authenticated: false,
  token: null,
  email: null,
  userName: null,
};

const storedState = localStorage.getItem("authState");

if (storedState) {
  initialState = JSON.parse(storedState);
  setAuthTokenToServiceInstance(initialState.token);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.authenticated = true;
      state.userName = action.payload.email.split("@")[0];
      localStorage.setItem("authState", JSON.stringify(state));
      setAuthTokenToServiceInstance(action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.authenticated = false;
      state.userName = false;
      localStorage.setItem("authState", JSON.stringify(state));
      setAuthTokenToServiceInstance(null);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
