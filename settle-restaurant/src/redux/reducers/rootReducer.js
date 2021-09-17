import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import restaurantReducer from "./restReducer";

export default combineReducers({
  loginReducer,
  restaurantReducer,
});
