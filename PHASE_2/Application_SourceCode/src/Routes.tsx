import { Switch, Route } from "react-router-dom";
import CountryReport from "./components/CountryReport/CountryReport";
import { usaAdvice } from "./constants/Countries";
import Home from "./pages/Home/Home";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/country">
      <CountryReport advice={usaAdvice} />
    </Route>
    <Route path="/*">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
