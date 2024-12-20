import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerNewUser } from "./userService";

interface userData {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  message: string;
}

const initialState: userData = {
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  status: "idle",
  error: null,
  message: "",
};

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
  } catch (error: any) {
    console.error("Error creating user:", error);
    return rejectWithValue(error.message || "Failed to create user");
  }
});

const newUserSlice = createSlice({
  name: "registerNewUser",
  initialState,
  reducers: {},
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
        }
      )
      .addCase(createUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to create user";
      });
  },
});

export default newUserSlice.reducer;
