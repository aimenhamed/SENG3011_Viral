import { configureStore } from "@reduxjs/toolkit";
import { FC } from "react";
import { Provider } from "react-redux";
import { DeepPartial, ReducersMapObject} from "redux";
import { initialState, subscriptionSlice } from "src/logic/redux/reducers/subscriptionSlice/subscriptionSlice";
import { render as rtlRender } from "@testing-library/react";

const preloadedInitialState = {
  app: initialState,
};

const getMockStore = (
  reducers: ReducersMapObject = {
    app: subscriptionSlice.reducer,
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
        app: subscriptionSlice.reducer,
      },
      preloadedState: state || preloadedInitialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};
// re-export everything
export * from "@testing-library/react";

// override methods
export { render, getMockStore, preloadedInitialState };
