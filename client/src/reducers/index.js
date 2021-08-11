import { combineReducers } from "redux";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import searchReducer from './searchReducer';

export default combineReducers({
  album: albumReducer,
  artist: artistReducer,
  search: searchReducer,
});
