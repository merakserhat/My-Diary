import diaryActionTypes from "./diaryActionTypes";

const INITIAL_STATE = { isLoading: false, diary: null, error: "" };

function diaryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //edit
    case diaryActionTypes.EDIT_DIARY:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.EDIT_DIARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case diaryActionTypes.EDIT_DIARY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //write
    case diaryActionTypes.WRITE_DIARY:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.WRITE_DIARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diary: action.payload?.data,
      };
    case diaryActionTypes.WRITE_DIARY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    //get one
    case diaryActionTypes.GET_ONE_DIARY:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.GET_ONE_DIARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diary: action.data,
      };
    case diaryActionTypes.GET_ONE_DIARY_ERROR:
      return {
        ...state,
        isLoading: false,
        diary: null,
        error: action.payload?.error,
      };
    //delete
    case diaryActionTypes.DELETE_DIARY:
      return {
        ...state,
        isLoading: true,
      };
    case diaryActionTypes.DELETE_DIARY_SUCCES:
      return {
        ...state,
        isLoading: false,
      };
    case diaryActionTypes.DELETE_DIARY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    default:
      return state;
  }
}

export default diaryReducer;
