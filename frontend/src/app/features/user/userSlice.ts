import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerNewUser } from "./userService";

interface userData {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  message: string;
  token: string | null;
}

const initialState: userData = {
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  status: "idle",
  error: null,
  message: "",
  token: null,
};

interface UserResponse {
  message: string;
  user: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    email: string;
  };
  token: string;
}

export const createUser = createAsyncThunk<
  userData,
  {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }
>("user/createUser", async (data, { rejectWithValue }) => {
  try {
    const response = await registerNewUser(data);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return rejectWithValue("Failed to create user");
  }
});

export const loginExistingUser = createAsyncThunk<
  UserResponse,
  {
    email: string;
    password: string;
  },
  { rejectValue: string }

>("user/loginExistingUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    return response;
  } catch (error:any) {
    console.error("Error logging in user:", error);
    return rejectWithValue(error.message || "Login failed");
  }
});

const userSlice = createSlice({
  name: "registerNewUser",
  initialState,
  reducers: {
    resetUser: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<userData>) => {
          state.status = "idle";
          state.firstname = action.payload.firstname;
          state.lastname = action.payload.lastname;
          state.email = action.payload.email;
          state.password = action.payload.password;
          state.message = action.payload.message;
          state.token = action.payload.token;
        }
      )
      .addCase(createUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to create user";
      });
    builder
      .addCase(loginExistingUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginExistingUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.status = "idle";
          state.firstname = action.payload.user.fullname.firstname;
          state.lastname = action.payload.user.fullname.lastname;
          state.email = action.payload.user.email;
          state.token = action.payload.token;
          state.message = action.payload.message;
        }
      )
      .addCase(loginExistingUser.rejected,  (state, action: PayloadAction<string | undefined>) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
