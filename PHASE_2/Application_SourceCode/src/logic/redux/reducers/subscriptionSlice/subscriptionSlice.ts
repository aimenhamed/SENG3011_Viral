import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { Subscription } from "src/interfaces/SubscriptionInterface";
import { getSubscription } from "src/logic/functions/getSubscription.function";
import { RootState } from "../../store";

export const getSubscriptionDispatch = createAsyncThunk<
  Subscription,
  void,
  { state: RootState }
>("subscription/getSubscriptionDispatch", async (_, { rejectWithValue }) => {
  try {
    const res = (await getSubscription()) as Subscription;
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
  GET_SUBSCRIPTION_LOADING = "GET_SUBSCRIPTION_LOADING",
  GET_SUBSCRIPTION_FAILED = "GET_SUBSCRIPTION_FAILED",
  GET_SUBSCRIPTION_COMPLETED = "GET_SUBSCRIPTION_COMPLETED",
}

export interface SubscriptionState {
  app: Subscription;
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: SubscriptionState = {
  app: {} as Subscription,
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    updateSubscription: (state, action: PayloadAction<Subscription>) => ({
      ...state,
      app: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscriptionDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.GET_SUBSCRIPTION_COMPLETED,
      app: action.payload,
    }));
    builder.addCase(getSubscriptionDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.GET_SUBSCRIPTION_LOADING;
    });
    builder.addCase(getSubscriptionDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.GET_SUBSCRIPTION_FAILED;
    });
  },
});

export const { updateSubscription } = subscriptionSlice.actions;

export const selectAPP = (state: RootState) => state.app;
export const selectAPPLoadingStatus = (state: RootState) =>
  state.app.loadingStatus;
export const selectAPPLoadingError = (state: RootState) => state.app.error;

export default subscriptionSlice.reducer;
