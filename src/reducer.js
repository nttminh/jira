import { combineReducers } from "redux";
import pageReducer from "./reducers/pageReducer";

export default function createReducer(asyncReducers) {
  return combineReducers({
    config: pageReducer,
    ...asyncReducers,
  });
}
