import authActionTypes from "./authActionTypes";

export const login = (payload, onSuccess, onError) => {
  return {
    type: authActionTypes.LOGIN,
    payload,
    onSuccess,
    onError,
  };
};

export const loginError = () => {
  return {
    type: authActionTypes.LOGIN_ERROR,
  };
};

export const loginSuccess = (data) => ({
  type: authActionTypes.LOGIN_SUCCESS,
  data,
});

export const register = (payload, onSuccess, onError) => ({
  type: authActionTypes.REGISTER,
  payload,
  onSuccess,
  onError,
});

export const registerError = () => ({
  type: authActionTypes.REGISTER_ERROR,
});

export const registerSuccess = () => ({
  type: authActionTypes.REGISTER_SUCCESS,
});

export const getResetLink = (payload, onSuccess, onError) => ({
  type: authActionTypes.GET_RESET_LINK,
  payload,
  onSuccess,
  onError,
});

export const getResetLinkError = () => ({
  type: authActionTypes.GET_RESET_LINK_ERROR,
});

export const getResetLinkSuccess = (data) => ({
  type: authActionTypes.GET_RESET_LINK_SUCCESS,
  data,
});

export const validateResetToken = (payload, onSuccess, onError) => ({
  type: authActionTypes.VALIDATE_RESET_TOKEN,
  payload,
  onSuccess,
  onError,
});

export const validateResetTokenError = () => ({
  type: authActionTypes.VALIDATE_RESET_TOKEN_ERROR,
});

export const validateResetTokenSuccess = (data) => ({
  type: authActionTypes.VALIDATE_RESET_TOKEN_SUCCESS,
  data,
});

export const resetPassword = (payload, onSuccess, onError) => ({
  type: authActionTypes.RESET_PASSWORD,
  payload,
  onSuccess,
  onError,
});

export const resetPasswordError = () => ({
  type: authActionTypes.RESET_PASSWORD_ERROR,
});

export const resetPasswordSuccess = (data) => ({
  type: authActionTypes.RESET_PASSWORD_SUCCESS,
  data,
});
