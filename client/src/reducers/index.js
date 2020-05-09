import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
// import designsReducer from "./designsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer
  // designs: designsReducer
});
