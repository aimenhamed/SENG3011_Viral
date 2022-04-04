import { Switch, Route } from "react-router-dom";
import Country from "./pages/Country/Country";
import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home/Home";
import OutbreakArticles from "./pages/Home/OutbreakArticles";
import Landing from "./pages/Landing/Landing";
import Settings from "./pages/Settings/Settings";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/country">
      <Country countryName="Ukraine" />
    </Route>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route path="/outbreaks">
      <OutbreakArticles />
    </Route>
    <Route path="/">
      <Landing />
    </Route>
  </Switch>
);

export default Routes;
