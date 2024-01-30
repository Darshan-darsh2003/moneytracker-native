// src/redux/reducers.ts

import { combineReducers } from "redux";
import dataReducer from "./slices/dataSlice";

const rootReducer = combineReducers({
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
