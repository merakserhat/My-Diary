const authActionTypes = {
  LOGIN: "auth/login",
  LOGIN_SUCCESS: "auth/login-success",
  LOGIN_ERROR: "auth/login-error",
  REGISTER: "auth/register",
  REGISTER_SUCCESS: "auth/register-success",
  REGISTER_ERROR: "auth/register-error",
  GET_RESET_LINK: "auth/get-reset-link",
  GET_RESET_LINK_SUCCESS: "auth/get-reset-link-success",
  GET_RESET_LINK_ERROR: "auth/get-reset-link-error",
  VALIDATE_RESET_TOKEN: "auth/validate-reset-token",
  VALIDATE_RESET_TOKEN_SUCCESS: "auth/validate-reset-token-success",
  VALIDATE_RESET_TOKEN_ERROR: "auth/validate-reset-token-error",
  RESET_PASSWORD: "auth/reset-password",
  RESET_PASSWORD_SUCCESS: "auth/reset-password-success",
  RESET_PASSWORD_ERROR: "auth/reset-password-error",
  LOGOUT: "auth/logout",
};

export default authActionTypes;
