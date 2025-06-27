import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import preferencesReducer from "../features/preferences/preferencesSlice";
import { newsApi } from "@/services/newsApi";
import { tmdbApi } from "@/services/tmdbApi";

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    })
      .concat(newsApi.middleware)
      .concat(tmdbApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
