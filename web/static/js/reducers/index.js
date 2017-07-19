import { combineReducers } from "redux"

import user from "./user"
import idea from "./idea"
import stage from "./stage"
import insertedAt from "./inserted_at"
import ui from "./ui"

const rootReducer = combineReducers({
  user,
  idea,
  stage,
  insertedAt,
  ui,
})

export default rootReducer
