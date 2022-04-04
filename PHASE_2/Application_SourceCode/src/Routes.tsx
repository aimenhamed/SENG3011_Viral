import { Switch, Route } from "react-router-dom";
import Country from "./pages/Country/Country";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/country">
      <Country countryName="Ukraine" />
    </Route>
    <Route path="/*">
      <Landing />
    </Route>
  </Switch>
);

export default Routes;
