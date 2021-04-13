import generationReducer from "./generation";
import { combineReducers } from "redux";

export default combineReducers({
  generation: generationReducer,
});
