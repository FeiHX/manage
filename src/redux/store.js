import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CollApsedReducer } from "../redux/reducers/CollapsedReducer";
import { CurrentUserReducer } from "./reducers/CurrentUserReducer.js";
import { CategoriesReducer } from "./reducers/CategoriesReducer.js";
import { RoleListReducer } from "./reducers/RoleListReducer.js";
import { RightListReducer } from "./reducers/RightListReducer.js";
import { NoticeListReducer } from "./reducers/NoticeListReducer.js";
import { ChatMessageReducer } from "./reducers/ChatMessageReducer.js";
const rootReducer = combineReducers({
  CollApsedReducer,
  CurrentUserReducer,
  CategoriesReducer,
  RoleListReducer,
  RightListReducer,
  NoticeListReducer,
  ChatMessageReducer
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["LoadingReducer"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = legacy_createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
