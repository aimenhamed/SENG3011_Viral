import { configureStore } from "@reduxjs/toolkit";
import { FC } from "react";
import { Provider } from "react-redux";
import { DeepPartial, ReducersMapObject } from "redux";
import {
  initialState,
  articleSlice,
} from "src/logic/redux/reducers/articleSlice/articleSlice";
import { render as rtlRender } from "@testing-library/react";

const preloadedInitialState = {
  articles: initialState,
};

const getMockStore = (
  reducers: ReducersMapObject = {
    articles: articleSlice.reducer,
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
        articles: articleSlice.reducer,
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
