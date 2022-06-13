import { all } from "redux-saga/effects";
import diarySaga from "./diary/diarySaga";

export default function* rootSaga() {
  yield all([diarySaga()]);
}
