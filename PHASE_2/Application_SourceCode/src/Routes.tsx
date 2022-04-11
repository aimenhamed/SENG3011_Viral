import { Switch, Route, Link } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import * as MenuSelection from "./components/MenuBar/MenuBarItems";
import Search from "./pages/Articles/Search";
import Articles from "./pages/Articles/Search";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Landing/Landing";
import Landing from "./pages/Landing/Landing";

const Routes = () => {
  {/*<Switch>
    <Route path="/home">
      
      <Home />
    </Route>
    <Route path="/search">
      
      <Articles />
      </Route>
    <Route path="/">
      <Landing />
    </Route>

   
</Switch>*/}
const DefaultRoutes = () => {
  return (
    <>
      <MenuBar />
      <Switch>
        
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        
      </Switch>
     
    </>
  );
};

return (
  
    <Switch>
    <Route exact path="/" component={LandingPage} />
     
      <Route component={DefaultRoutes} />
    </Switch>
  
);
};

export default Routes;
