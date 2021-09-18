import { combineReducers } from "redux";
import authReducer from "./authReducer";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";
import searchArtistReducer from "./searchArtistReducer";

export default combineReducers({
  auth: authReducer,
  album: albumReducer,
  error: errorReducer,
  artist: artistReducer,
  search: searchReducer,
  searchArtists: searchArtistReducer,
});
