import { combineReducers } from "redux";

import top from "./top";
import episode from "./episode";
import episodes from "./episodes";
import details from "./details";
import search from "./search"

const rootReducer = combineReducers({
  top,
  episode,
  episodes,
  details,
  search,
})

export default rootReducer
