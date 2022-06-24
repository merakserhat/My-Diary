import { call, all, takeEvery, put } from "redux-saga/effects";
import Service from "../../service";
import {
  getResetLinkError,
  getResetLinkSuccess,
  login,
  loginError,
  loginSuccess,
  registerError,
  registerSuccess,
  resetPasswordError,
  resetPasswordSuccess,
  validateResetTokenError,
  validateResetTokenSuccess,
} from "./authActions";
import authActionTypes from "./authActionTypes";

export function* LOGIN({
  payload: { email = "", password = "" },
  onSuccess,
  onError,
}) {
  try {
    const response = yield call(Service.post, "/auth/login", {
      email,
      password,
    });
    console.log("login response", response);
    yield put(loginSuccess(response));

    onSuccess?.({
      ...response,
      data: response.data,
    });
  } catch (error) {
    yield put(loginError(error));
    onError?.(error);
  }
}

export function* REGISTER({
  payload: { email = "", password = "" },
  onSuccess,
  onError,
}) {
  try {
    yield call(Service.put, `/auth/register`, { email, password });
    yield put(registerSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(registerError(error));
    onError?.(error);
  }
}

export function* GET_RESET_LINK({
  payload: { email = "" },
  onSuccess,
  onError,
}) {
  try {
    yield call(Service.post, "/auth/get-reset-link", { email });
    yield put(getResetLinkSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(getResetLinkError(error));
    onError?.(error);
  }
}

export function* VALIDATE_RESET_TOKEN({ payload, onSuccess, onError }) {
  try {
    yield call(Service.post, "/auth/validate-reset-token", payload);
    yield put(validateResetTokenSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(validateResetTokenError(error));
    onError?.(error);
  }
}

export function* RESET_PASSWORD({
  payload: { password = "", token = "" },
  onSuccess,
  onError,
}) {
  try {
    yield call(Service.put, "/auth/reset-password", { password, token });
    yield put(resetPasswordSuccess());
    onSuccess?.();
  } catch (error) {
    yield put(resetPasswordError(error));
    onError?.(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(authActionTypes.LOGIN, LOGIN),
    takeEvery(authActionTypes.REGISTER, REGISTER),
    takeEvery(authActionTypes.GET_RESET_LINK, GET_RESET_LINK),
    takeEvery(authActionTypes.VALIDATE_RESET_TOKEN, VALIDATE_RESET_TOKEN),
    takeEvery(authActionTypes.RESET_PASSWORD, RESET_PASSWORD),
  ]);
}
