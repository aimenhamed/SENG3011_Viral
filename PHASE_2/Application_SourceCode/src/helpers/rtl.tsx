import { configureStore } from "@reduxjs/toolkit";
import { FC } from "react";
import { Provider } from "react-redux";
import { DeepPartial, ReducersMapObject } from "redux";
import {
  initialState as articleState,
  articleSlice,
} from "src/logic/redux/reducers/articleSlice/articleSlice";
import {
  initialState as adviceState,
  adviceSlice,
} from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import {
  initialState as flightsState,
  flightsSlice,
} from "src/logic/redux/reducers/flightsSlice/flightsSlice";
import { render as rtlRender } from "@testing-library/react";
import {
  initialState as userState,
  userSlice,
} from "src/logic/redux/reducers/userSlice/userSlice";

const preloadedInitialState = {
  articles: articleState,
  advice: adviceState,
  flights: flightsState,
  user: userState,
};

const getMockStore = (
  reducers: ReducersMapObject = {
    advice: adviceSlice.reducer,
    articles: articleSlice.reducer,
    flights: flightsSlice.reducer,
    user: userSlice.reducer,
  },
  preloadedState: DeepPartial<any | undefined> = { preloadedInitialState }
) =>
  configureStore({
    reducer: reducers,
    preloadedState,
  });

const render = (
  ui: JSX.Element,
  state?: any,
  {
    store = configureStore({
      reducer: {
        advice: adviceSlice.reducer,
        articles: articleSlice.reducer,
        flights: flightsSlice.reducer,
        user: userSlice.reducer,
      },
      preloadedState: state || preloadedInitialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
// re-export everything
export * from "@testing-library/react";

// override methods
export { render, getMockStore, preloadedInitialState };
