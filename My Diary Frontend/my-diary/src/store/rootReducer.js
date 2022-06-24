import { combineReducers } from "redux";

import auth from "./auth/authReducer";
import diary from "./diary/diaryReducer";

const rootReducer = combineReducers({ auth, diary });

export default rootReducer;
