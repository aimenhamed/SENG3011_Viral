import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/*">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
