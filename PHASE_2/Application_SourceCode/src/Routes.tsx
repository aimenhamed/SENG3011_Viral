import { Switch, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Search from "./pages/Articles/Search";
import Country from "./pages/Country/Country";
import Favourites from "./pages/Favourites/Favourites";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/Landing/Landing";
import SettingsPage from "./pages/Settings/Settings";
import TestPage from "./pages/TestPage/TestPage";

const Routes = () => {
  const DefaultRoutes = () => {
    return (
      <>
        <div style={{display: "flex"}}>
          <MenuBar />
          <div style={{width: "calc(100vw - 200px)"}}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/country/:countryName" component={Country} />
              <Route path="/search" component={Search} />
              <Route path="/favourites/" component={Favourites} />
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
      <Route path="/test" component={TestPage} />
      <Route component={DefaultRoutes} />
    </Switch>
  );
};

export default Routes;
