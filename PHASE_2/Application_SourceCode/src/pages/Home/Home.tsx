import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Articles from "../Articles/Search";
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

  const goToCountry = (countryName: string) => {
    history.push(`/country/${encodeURIComponent(countryName)}`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Map countryClick={goToCountry} />
    </div>
  );
};

export default Home;
