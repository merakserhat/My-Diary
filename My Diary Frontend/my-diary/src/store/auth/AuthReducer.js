import { createSlice } from "@reduxjs/toolkit";
import { setAuthTokenToServiceInstance } from "../../service";

let INITIAL_STATE = {
  authenticated: false,
  token: null,
  email: null,
  userName: null,
  isLoading: false,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //login
    case diaryActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case diaryActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //register
    case diaryActionTypes.REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diary: action.payload?.data,
      };
    case diaryActionTypes.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //get reset link
    case diaryActionTypes.GET_RESET_LINK:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.GET_RESET_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diary: action.data,
      };
    case diaryActionTypes.GET_RESET_LINK_ERROR:
      return {
        ...state,
        isLoading: false,
        diary: null,
        error: action.payload?.error,
      };
    //validate reset token
    case diaryActionTypes.VALIDATE_RESET_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.VALIDATE_RESET_TOKEN_SUCCES:
      return {
        ...state,
        isLoading: false,
      };
    case diaryActionTypes.VALIDATE_RESET_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //reset password
    case diaryActionTypes.RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.RESET_PASSWORD_SUCCES:
      return {
        ...state,
        isLoading: false,
      };
    case diaryActionTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    default:
      return state;
  }
}

export default authReducer;

/*
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
*/
