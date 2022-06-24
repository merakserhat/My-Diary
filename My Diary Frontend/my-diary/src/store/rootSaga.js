import { all } from "redux-saga/effects";
import diarySaga from "./diary/diarySaga";
import authSaga from "./auth/authSaga";

export default function* rootSaga() {
  yield all([diarySaga(), authSaga()]);
}
