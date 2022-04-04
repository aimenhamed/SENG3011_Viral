import { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuBar from "src/components/MenuBar/MenuBar";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Articles from "../Articles/Articles";
import BookmarkedArticles from "../BookmarkedArticles/BookmarkedArticles";
import BookmarkedCountries from "../BookmarkedCountries/BookmarkedCountries";
import Country from "../Country/Country";
import Map from "../Map/Map";
import SettingsPage from "../Settings/Settings";

export enum ViralPage {
  MAP,
  COUNTRY,
  SETTINGS,
  BOOKMARKED_COUNTRIES,
  BOOKMARKED_ARTICLES,
  ARTICLES,
}

const Home = () => {
  const history = useHistory();
  const { user } = useAppSelector(selectUser);
  if (!user) history.push("/");

  const [viralPage, setViralPage] = useState<ViralPage>(ViralPage.MAP);
  const [country, setCountry] = useState<string>("");

  const navigate = (page: ViralPage) => {
    setViralPage(page);
  };
  const goToCountry = (countryName: string) => {
    setCountry(countryName);
    setViralPage(ViralPage.COUNTRY);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <MenuBar navigate={navigate} />
      {viralPage === ViralPage.MAP && <Map countryClick={goToCountry} />}
      {viralPage === ViralPage.SETTINGS && <SettingsPage />}
      {viralPage === ViralPage.COUNTRY && (
        <Country
          countryName={country}
          backToMap={() => setViralPage(ViralPage.MAP)}
        />
      )}
      {viralPage === ViralPage.ARTICLES && <Articles />}
      {viralPage === ViralPage.BOOKMARKED_ARTICLES && <BookmarkedArticles />}
      {viralPage === ViralPage.BOOKMARKED_COUNTRIES && (
        <BookmarkedCountries countryClick={goToCountry} />
      )}
    </div>
  );
};

export default Home;
