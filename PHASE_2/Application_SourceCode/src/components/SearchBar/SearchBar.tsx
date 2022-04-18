import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import * as stringSimilarity from "string-similarity";
import { BestMatch } from "string-similarity";
import jvmCountries from "./countries";
import { SearchInputBar, ResultsParentDiv, SearchResultDiv, SearchResultTxt } from "./style";

type SearchBarProps = {
  countryClick: (countryName: string) => void;
}

const SearchBar = ({ countryClick }: SearchBarProps) => {
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<stringSimilarity.Rating[]>(
    []
  );

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

    if (all !== undefined) {
      for (let i = 0; i < all?.countries?.length; i++) {
        if (all.countries[i].country === countryCode) {
          color = AdviceLevel[all.countries[i].adviceLevel]
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

      { search && (
        <ResultsParentDiv
          id="resultsDiv"
          onMouseLeave={() => setSearch(false)}
        >
          {searchResults.map((result) => (
            <SearchResultDiv
              key={result.target}
              tabIndex={0}
              role="button"
              style={findColour(result.target)}
              id={result.target}
              onClick={() => countryClick(result.target)}
            >
              <SearchResultTxt>{result.target}</SearchResultTxt>
            </SearchResultDiv>
        ))}
        </ResultsParentDiv>
      )}

    </div>
  );
};

export default SearchBar;
