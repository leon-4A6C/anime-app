import { combineReducers } from "redux";

import top from "./top";
import episode from "./episode";
import episodes from "./episodes";
import details from "./details";
import search from "./search"
import favorites from "./favorites"
import watched from "./watched"

const rootReducer = combineReducers({
  top,
  episode,
  episodes,
  details,
  search,
  favorites,
  watched,
})

export default rootReducer
