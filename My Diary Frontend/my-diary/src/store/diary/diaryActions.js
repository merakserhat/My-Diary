import diaryActionTypes from "./diaryActionTypes";

export const getOneDiary = (payload, onSuccess, onError) => {
  return {
    type: diaryActionTypes.GET_ONE_DIARY,
    payload,
    onSuccess,
    onError,
  };
};

export const getOneDiaryError = () => {
  return {
    type: diaryActionTypes.GET_ONE_DIARY_ERROR,
  };
};

export const getOneDiarySuccess = (data) => ({
  type: diaryActionTypes.GET_ONE_DIARY_SUCCESS,
  data,
});

export const editDiary = (payload, onSuccess, onError) => ({
  type: diaryActionTypes.EDIT_DIARY,
  payload,
  onSuccess,
  onError,
});

export const editDiaryError = () => ({
  type: diaryActionTypes.EDIT_DIARY_ERROR,
});

export const editDiarySuccess = () => ({
  type: diaryActionTypes.EDIT_DIARY_SUCCESS,
});

export const deleteDiary = (payload, onSuccess, onError) => ({
  type: diaryActionTypes.DELETE_DIARY,
  payload,
  onSuccess,
  onError,
});

export const deleteDiaryError = () => ({
  type: diaryActionTypes.DELETE_DIARY_ERROR,
});

export const deleteDiarySuccess = (data) => ({
  type: diaryActionTypes.DELETE_DIARY_SUCCES,
  data,
});

export const writeDiary = (payload, onSuccess, onError) => ({
  type: diaryActionTypes.WRITE_DIARY,
  payload,
  onSuccess,
  onError,
});

export const writeDiaryError = () => ({
  type: diaryActionTypes.WRITE_DIARY_ERROR,
});

export const writeDiarySuccess = (data) => ({
  type: diaryActionTypes.WRITE_DIARY_SUCCESS,
  data,
});
