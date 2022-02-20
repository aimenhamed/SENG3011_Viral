import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { makeServer } from './stubbing/server';
import { store } from './logic/redux/store';
import AppConfig, { AppEnv } from "./logic/config";

const render = () => {
  const App = require("./App").default;
  const site = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  if (AppConfig.env !== AppEnv.PROD) {
    makeServer({ environment: "test" });
    window.localStorage.setItem("user_client_id", "sample-id");
    ReactDOM.render(site, document.getElementById('root'));
  } else {
    ReactDOM.render(site, document.getElementById("root"));
  }
};

render();

