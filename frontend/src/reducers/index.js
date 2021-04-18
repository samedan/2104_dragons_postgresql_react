import generationReducer from "./generation";
import dragonReducer from "./dragon";
import accountReducer from "./account";
import { combineReducers } from "redux";

export default combineReducers({
  generation: generationReducer,
  dragon: dragonReducer,
  account: accountReducer,
});
