import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const logger = createLogger({
  collapsed: true,
  level: "info",
});

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
}
