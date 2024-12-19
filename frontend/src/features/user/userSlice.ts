import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import { RootState } from '../../app/store';

interface AuthState {
  user: never | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials: { email: string; password: string }) => {
  const response = await userService.login(credentials);
  return response;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await userService.logout();
});

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const selectAuth = (state: RootState) => state.user;
export default userSlice.reducer;
