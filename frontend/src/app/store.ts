import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice, { resetUser } from "./features/user/userSlice";
import driverSlice, { resetDriver } from "./features/driver/driverSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "driver"],
};

const rootReducer = combineReducers({
  user: userSlice,
  driver: driverSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// ✅ Reset Redux Store When Logout Event is Triggered
window.addEventListener("logout", () => {
  persistor.purge(); // Clear persisted state
  store.dispatch(resetUser()); // Reset user state
  store.dispatch(resetDriver()); // Reset driver state
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
