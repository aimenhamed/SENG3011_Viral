/* eslint-disable */
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import Articles from "src/pages/Articles/Search";
import BookmarkedArticles from "src/pages/BookmarkedArticles/BookmarkedArticles";
import BookmarkedCountries from "src/pages/BookmarkedCountries/BookmarkedCountries";
import Country from "src/pages/Country/Country";
import { ViralPage } from "src/pages/Home/Home";
import SettingsPage from "src/pages/Settings/Settings";
import * as stringSimilarity from "string-similarity";
import { BestMatch } from "string-similarity";
import Map from "../../pages/Map/Map";
import jvmCountries from "./countries";
import { SearchInputBar, ResultsParentDiv, SearchResultDiv, SearchResultTxt } from "./style";


const SearchBar = () => {
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<stringSimilarity.Rating[]>(
    []
  );
  const [country, setCountry] = useState<string>("");
  const [viralPage, setViralPage] = useState<ViralPage>(ViralPage.MAP);
  const { all } = useAppSelector(selectAdvice);

  const regionNames: string[] = [];
  Object.entries(jvmCountries).forEach((entry) => {
    regionNames.push(entry[1].name);
  });

  const searchRegion = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      setSearch(true);
    } else {
      setSearch(false);
    }

    const bestMatchResults: BestMatch = stringSimilarity.findBestMatch(
      searchTerm,
      regionNames
    );
    const {ratings} = bestMatchResults;
    ratings.sort((a, b) => b.rating - a.rating); // desc order
    const topFiveResults = ratings.slice(0, 5);

    setSearchResults(topFiveResults);
  };

  const goToCountry = (countryName: string) => {
    setCountry(countryName);
    setViralPage(ViralPage.COUNTRY);
  };

  const AdviceLevel: {
    [key: string]: string;
  } = {
    null : "#5dbc60",
    "Do not travel": "#e95757",
    "Exercise a high degree of caution": "#f6d34e",
    "Reconsider your need to travel": "#f1902c",
  };
  const values: {
    [key: string]: number;
  } = {};
  all?.countries.forEach((country) => {
    const countryCode = country.country;
    const advLvl = country.adviceLevel;
    values[countryCode] = AdviceLevel[advLvl] as unknown as number;
  });

  const findColour = (country: string) => {
    let countryCode;
    let color;

    Object.entries(jvmCountries).forEach((entry) => {
      const currCountry = entry[1]['name']
      const currCountryCode = entry[0]
  
      if (currCountry === country) {
        countryCode = currCountryCode;
      }
    });
    if (all != undefined) {
      for (let i = 0; i < all?.countries?.length; i++) {
        // console.log('country code: ' + typeof(countryCode) + ', curr: ' + typeof(all.countries[i].country))
        if (all.countries[i].country === countryCode) {
          color = AdviceLevel[all.countries[i].adviceLevel]
          console.log('HERE')
          break;
        }
      }
    }
 

    return {
      backgroundColor: color,
    }
  }

  return (
    <div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {viralPage === ViralPage.COUNTRY && (
          <Country
            countryName={country}
          />
        )}
        {viralPage !== ViralPage.COUNTRY && (
           <div>
            <div id="search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ position: "relative", right: "-25px" }}
            />
            <SearchInputBar
              type="text"
              placeholder="Search a country"
              onChange={(e) => searchRegion(e.target.value)}
            />
          </div>
          {search ? (
        <ResultsParentDiv
          id="resultsDiv"
          onMouseLeave={() => setSearch(false)}
        >
          {searchResults.map((result) => (
            <SearchResultDiv
              key={result.target}
              tabIndex={0}
              role="button"
              // onKeyDown={() => adjustHomePage(result.target)}
              style = {findColour(result.target)}
              id={result.target}
              onClick={() => goToCountry(result.target)}
            >
              <SearchResultTxt>{result.target}</SearchResultTxt>
            </SearchResultDiv>
          ))}
        </ResultsParentDiv>
      ) : (
        <div style={{ display: "none" }} />
      )}

          </div>

        )}
      </div>

    </div>
  );
};

export default SearchBar;
