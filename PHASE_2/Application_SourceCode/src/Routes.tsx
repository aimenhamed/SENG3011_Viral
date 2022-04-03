import { Switch, Route } from "react-router-dom";
import Country from "./pages/Country/Country";
import Home from "./pages/Home/Home";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/country">
      <Country countryName="Ukraine" />
    </Route>
    <Route path="/*">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
