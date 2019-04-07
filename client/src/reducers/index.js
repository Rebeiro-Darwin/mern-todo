import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  item: itemReducer
});
