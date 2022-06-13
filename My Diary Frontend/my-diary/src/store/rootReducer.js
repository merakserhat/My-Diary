import { combineReducers } from "redux";

import auth from "./auth/AuthReducer";
import diary from "./diary/diaryReducer";

const rootReducer = combineReducers({ auth, diary });

export default rootReducer;
