import { configureStore } from "@reduxjs/toolkit";
import { subscriptionSlice } from "./reducers/subscriptionSlice/subscriptionSlice";

export const store = configureStore({
  reducer: {
    app: subscriptionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
