import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const Routes = () => (
  <Switch>
    <Route path="/home">
      <Home />
    </Route>
    <Route path='/favourites'>
      
    </Route>
    <Route path='destinations'>

    </Route>
    <Route path='knownOutbreaks'>

    </Route>
    <Route path='profile'>

    </Route>
    <Route path='flightInfo'>

    </Route>
    <Route path='settings'>

    </Route>
    <Route path='/*'>
      <Home />
    </Route>
  </Switch>
);

export default Routes;
