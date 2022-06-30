import { setAuthTokenToServiceInstance } from "../../service";
import authActionTypes from "./authActionTypes";

let INITIAL_STATE = {
  authenticated: false,
  token: null,
  email: null,
  userName: null,
  isLoading: false,
};

const storedState = localStorage.getItem("authState");

if (storedState) {
  INITIAL_STATE = JSON.parse(storedState);
  setAuthTokenToServiceInstance(INITIAL_STATE.token);
}

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //login
    case authActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.LOGIN_SUCCESS: {
      const newState = {
        ...state,
        email: action.payload?.email,
        token: action.payload?.token,
        userName: action.payload?.email.split("@")[0],
        authenticated: true,
        isLoading: false,
      };
      localStorage.setItem("authState", JSON.stringify(newState));
      setAuthTokenToServiceInstance(action.payload?.token);
      console.log(action);

      return newState;
    }
    case authActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        error: action.error,
      };
    //register
    case authActionTypes.REGISTER:
      return {
        ...state,
        isLoading: false,
      };
    case authActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case authActionTypes.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    //get reset link
    case authActionTypes.GET_RESET_LINK:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.GET_RESET_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diary: action.data,
      };
    case authActionTypes.GET_RESET_LINK_ERROR:
      return {
        ...state,
        isLoading: false,
        diary: null,
        error: action.payload?.error,
      };
    //validate reset token
    case authActionTypes.VALIDATE_RESET_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.VALIDATE_RESET_TOKEN_SUCCES:
      return {
        ...state,
        isLoading: false,
      };
    case authActionTypes.VALIDATE_RESET_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //reset password
    case authActionTypes.RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case authActionTypes.RESET_PASSWORD_SUCCES:
      return {
        ...state,
        isLoading: false,
      };
    case authActionTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //logout
    case authActionTypes.LOGOUT: {
      const newState = {
        ...state,
        isLoading: false,
        authenticated: false,
        token: null,
        email: null,
        userName: null,
      };

      localStorage.setItem("authState", JSON.stringify(newState));
      setAuthTokenToServiceInstance(null);
      return newState;
    }

    default:
      return state;
  }
}

export default authReducer;

/*


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
