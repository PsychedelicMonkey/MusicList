import { combineReducers } from "redux";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  album: albumReducer,
  error: errorReducer,
  artist: artistReducer,
  search: searchReducer,
});
