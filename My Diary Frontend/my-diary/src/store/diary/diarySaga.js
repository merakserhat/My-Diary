import { call, all, takeEvery, put } from "redux-saga/effects";
import Service from "../../service";
import {
  deleteDiaryError,
  deleteDiarySuccess,
  editDiaryError,
  editDiarySuccess,
  getOneDiaryError,
  getOneDiarySuccess,
  writeDiaryError,
  writeDiarySuccess,
} from "./diaryActions";
import diaryActionTypes from "./diaryActionTypes";

export function* GET_ONE_DIARY({
  payload: { id = "", date },
  onSuccess,
  onError,
}) {
  try {
    const response = yield call(Service.get, "/diary/get-one", {
      ...(id && {
        _id: id,
      }),
      ...(date && {
        date,
      }),
    });

    console.log(response);

    yield put(getOneDiarySuccess(response));

    onSuccess?.({
      ...response,
      data: response.data,
    });
  } catch (error) {
    yield put(getOneDiaryError(error));
    onError?.(error);
  }
}

export function* EDIT_DIARY({ payload, onSuccess, onError }) {
  try {
    yield call(Service.put, `/diary/edit`, payload);
    yield put(editDiarySuccess());
    onSuccess?.();
  } catch (error) {
    yield put(editDiaryError(error));
    onError?.(error);
  }
}

export function* DELETE_DIARY({ payload, onSuccess, onError }) {
  try {
    yield call(Service.delete, `/diary/delete`, payload);
    yield put(deleteDiarySuccess());
    onSuccess?.();
  } catch (error) {
    yield put(deleteDiaryError(error));
    onError?.(error);
  }
}

export function* WRITE_DIARY({ payload, onSuccess, onError }) {
  try {
    yield call(Service.post, `/diary/write`, payload);
    yield put(writeDiarySuccess());
    onSuccess?.();
  } catch (error) {
    yield put(writeDiaryError(error));
    onError?.(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(diaryActionTypes.GET_ONE_DIARY, GET_ONE_DIARY),
    takeEvery(diaryActionTypes.EDIT_DIARY, EDIT_DIARY),
    takeEvery(diaryActionTypes.DELETE_DIARY, DELETE_DIARY),
    takeEvery(diaryActionTypes.WRITE_DIARY, WRITE_DIARY),
  ]);
}
