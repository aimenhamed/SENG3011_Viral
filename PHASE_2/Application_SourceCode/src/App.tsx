import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
//import menuItems from "src/components/MenuBar/MenuBar"
import MenuBar from "src/components/MenuBar/MenuBar";
import Home, { ViralPage } from "./pages/Home/Home";
import BookmarkedArticles from "./pages/BookmarkedArticles/BookmarkedArticles";
import Landing from "./pages/Landing/Landing";
import MenuBarItems from "./components/MenuBar/MenuBarItems";

const App = () => (
  <main>
    {/*<HashRouter><Routes /></HashRouter>*/}
    {/*<BrowserRouter basename="/home">
      <Link to="/knownoutbreaks"></Link>
</BrowserRouter>*/}

  {/*<Route path = '/home' component={Home}>
    <Route path = '/faveArticle' component={BookmarkedArticles}>
</Route></Route>*/}
  <BrowserRouter>
    
   
    {/*{MenuBarItems.map((menuItem) => (
    <Link to={menuItem.link}>{menuItem.itemName}</Link>
    ))}*/}
    
    
    <Routes />

  </BrowserRouter>
  </main>
)

export default App;
