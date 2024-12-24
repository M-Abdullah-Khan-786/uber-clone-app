import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginDriver, registerNewDriver } from "./driverService";

interface DriverData {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  driverStatus: string | null;
  vehicleType: string | null;
  vehicleNumber: string | null;
  vehicleColor: string | null;
  vehicleCapacity: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  message: string | null;
  token: string | null;
}

const initialState: DriverData = {
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  driverStatus: null,
  vehicleType: null,
  vehicleNumber: null,
  vehicleColor: null,
  vehicleCapacity: null,
  status: "idle",
  error: null,
  message: null,
  token: null,
};

interface DriverResponse {
  message: string;
  driver: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    email: string;
  };
  token: string;
}

interface CreateDriverResponse {
  message: string;
  driver: {
    firstname: string;
    lastname: string;
    email: string;
    status: string;
    vehicle: {
      vehicleType: string;
      vehicleNumber: string;
      vehicleColor: string;
      vehicleCapacity: string;
    };
  };
  token: string;
}


export const createDriver = createAsyncThunk<
  CreateDriverResponse,
  {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    vehicleType: string;
    vehicleNumber: string;
    vehicleColor: string;
    vehicleCapacity: string;
  },
  { rejectValue: string }
>("driver/createDriver", async (data, { rejectWithValue }) => {
  try {
    const response = await registerNewDriver(data);
    return response;
  } catch (error: any) {
    console.error("Error creating driver:", error);
    return rejectWithValue(error.message || "Failed to create driver");
  }
});

export const loginExistingDriver = createAsyncThunk<
  DriverResponse,
  { email: string; password: string },
  { rejectValue: string }
>("driver/loginExistingDriver", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginDriver(credentials);
    return response;
  } catch (error: any) {
    console.error("Error logging in driver:", error);
    return rejectWithValue(error.message || "Login failed");
  }
});

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDriver.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createDriver.fulfilled,
        (state, action: PayloadAction<CreateDriverResponse>) => {
          state.status = "idle";
          state.firstname = action.payload.driver.firstname;
          state.lastname = action.payload.driver.lastname;
          state.email = action.payload.driver.email;
          state.driverStatus = action.payload.driver.status;
          state.vehicleType = action.payload.driver.vehicle.vehicleType;
          state.vehicleNumber = action.payload.driver.vehicle.vehicleNumber;
          state.vehicleColor = action.payload.driver.vehicle.vehicleColor;
          state.vehicleCapacity = action.payload.driver.vehicle.vehicleCapacity;
          state.message = action.payload.message;
          state.token = action.payload.token;
        }
      )
      .addCase(
        createDriver.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to create user";
        }
      );
    builder
      .addCase(loginExistingDriver.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginExistingDriver.fulfilled,
        (state, action: PayloadAction<DriverResponse>) => {
          state.status = "idle";
          state.firstname = action.payload.driver.fullname.firstname;
          state.lastname = action.payload.driver.fullname.lastname;
          state.email = action.payload.driver.email;
          state.token = action.payload.token;
          state.message = action.payload.message;
        }
      )
      .addCase(
        loginExistingDriver.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Login failed";
        }
      );
  },
});

export default driverSlice.reducer;
