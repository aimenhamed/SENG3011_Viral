import { render } from "src/helpers/rtl";
import App from "./App";

test("renders home page", () => {
  const { getByText } = render(<App />);
  expect(getByText("Welcome to Viral Travel")).not.toBeNull();
});
