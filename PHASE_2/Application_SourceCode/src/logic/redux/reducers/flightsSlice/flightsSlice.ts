import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { Flight } from "src/interfaces/ViralInterface";
import {
  getFlightInfo,
  FlightRes,
} from "src/logic/functions/getFlightInfo.function";
import { RootState } from "../../store";

export const getFlightsDispatch = createAsyncThunk<
  FlightRes,
  void,
  { state: RootState }
>("getFlightsDispatch", async (_, { rejectWithValue }) => {
  try {
    const res = (await getFlightInfo()) as FlightRes;
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
        code: err.response.status,
        stack: err.stack,
      });
    }
    throw err;
  }
});

export enum LoadingStatusTypes {
  IDLE = "IDLE",
  GET_FLIGHTS_LOADING = "GET_FLIGHTS_LOADING",
  GET_FLIGHTS_FAILED = "GET_FLIGHTS_FAILED",
  GET_FLIGHTS_COMPLETED = "GET_FLIGHTS_COMPLETED",
}

export interface FlightState {
  flights: Flight[];
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: FlightState = {
  flights: [],
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    updateFlights: (state, action: PayloadAction<Flight[]>) => ({
      ...state,
      flights: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getFlightsDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.GET_FLIGHTS_COMPLETED,
      flights: action.payload.flights,
    }));
    builder.addCase(getFlightsDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.GET_FLIGHTS_LOADING;
    });
    builder.addCase(getFlightsDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.GET_FLIGHTS_FAILED;
    });
  },
});

export const { updateFlights } = flightsSlice.actions;

export const selectFlights = (state: RootState) => state.flights;
export const selectFlightsLoadingStatus = (state: RootState) =>
  state.flights.loadingStatus;
export const selectFlightsLoadingError = (state: RootState) =>
  state.flights.error;

export default flightsSlice.reducer;
