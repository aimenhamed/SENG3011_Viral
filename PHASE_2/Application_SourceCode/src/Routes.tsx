import { Switch, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Search from "./pages/Articles/Search";
import BookmarkedCountries from "./pages/BookmarkedCountries/BookmarkedCountries";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Landing/Landing";
import SettingsPage from "./pages/Settings/Settings";

const Routes = () => {
const DefaultRoutes = () => {
  return (
    <>
      <div style={{display: "flex"}}>
        <MenuBar />
        <div style={{width: "calc(100vw - 180px)"}}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/favourites/countries" component={BookmarkedCountries} />
            <Route path="/settings" component={SettingsPage} />
          </Switch>
        </div>
      </div>
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
