import { combineReducers } from "redux";
import albumReducer from "./albumReducer";
import searchReducer from './searchReducer';

export default combineReducers({
  album: albumReducer,
  search: searchReducer,
});
