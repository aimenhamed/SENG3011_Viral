import { configureStore } from "@reduxjs/toolkit";
import { flightsSlice } from "./reducers/flightsSlice/flightsSlice";
import { articleSlice } from "./reducers/articleSlice/articleSlice";
import { adviceSlice } from "./reducers/adviceSlice/adviceSlice";
import { userSlice } from "./reducers/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    advice: adviceSlice.reducer,
    articles: articleSlice.reducer,
    flights: flightsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
