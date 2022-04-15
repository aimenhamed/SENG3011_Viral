import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./logic/redux/store";
import AppConfig, { AppEnv } from "./logic/config";

const render = () => {
  const App = require("./App").default;
  const site = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  if (AppConfig.env !== AppEnv.PROD) {
    ReactDOM.render(site, document.getElementById("root"));
  } else {
    ReactDOM.render(site, document.getElementById("root"));
  }
};

render();
