import { combineReducers } from "redux";

import top from "./top";
import episode from "./episode";
import episodes from "./episodes";
import details from "./details";

const rootReducer = combineReducers({
  top,
  episode,
  episodes,
  details,
})

export default rootReducer
