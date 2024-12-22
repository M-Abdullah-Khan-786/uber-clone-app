import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from './features/user/userSlice';
import driverSlice from './features/driver/driverSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
    driver: driverSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
