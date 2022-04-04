import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import OutbreakArticles from "./pages/Home/OutbreakArticles";
//import DropdownBox from "./components/DropdownBox/DropdownBox";
//import OutbreakArticles from "./pages/Home/OutbreakArticles";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/outbreaks">
      <OutbreakArticles />
    </Route>
    <Route path="/*">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
