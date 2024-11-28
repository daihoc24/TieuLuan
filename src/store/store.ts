import { combineReducers, legacy_createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "../reducer/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
 
});

export const store = configureStore({
  reducer: persistReducer({
      key: 'root',
      storage
  }, rootReducer),
  devTools:true,
  middleware: (config) => config({
      serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;