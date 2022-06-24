const authActionTypes = {
  LOGIN: "auth/login",
  LOGIN_SUCCESS: "auth/edit-success",
  LOGIN_ERROR: "auth/edit-error",
  REGISTER: "auth/register",
  REGISTER_SUCCESS: "auth/edit-success",
  REGISTER_ERROR: "auth/edit-error",
  GET_RESET_LINK: "auth/get-reset-link",
  GET_RESET_LINK_SUCCESS: "auth/edit-success",
  GET_RESET_LINK_ERROR: "auth/edit-error",
  VALIDATE_RESET_TOKEN: "auth/validate-reset-token",
  VALIDATE_RESET_TOKEN_SUCCESS: "auth/edit-success",
  VALIDATE_RESET_TOKEN_ERROR: "auth/edit-error",
  RESET_PASSWORD: "auth/reset-password",
  RESET_PASSWORD_SUCCESS: "auth/edit-success",
  RESET_PASSWORD_ERROR: "auth/edit-error",
  LOGOUT: "auth/logout",
};

export default authActionTypes;
