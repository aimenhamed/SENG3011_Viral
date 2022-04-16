import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as stringSimilarity from "string-similarity";
import { BestMatch } from "string-similarity";
import jvmCountries from "./countries";

interface SearchProps {
  setHeading: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchProps> = ({ setHeading }) => {
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<stringSimilarity.Rating[]>(
    []
  );

  const searchResultTxtStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "small",
  };

  const searchResultDivStyle = {
    backgroundColor: "#2a9763",
    padding: "1px",
    paddingLeft: "15px",
    borderBottom: "1px solid #e8e8e8",
    borderLeft: "1px solid #e8e8e8",
    borderRight: "1px solid #e8e8e8",
    cursor: "pointer",
  };

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

  const adjustHomePage = (newCountry: string) => {
    setHeading(newCountry);
  };

  return (
    <div>
      <div id="search">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ position: "relative", right: "-25px" }}
        />
        <input
          type="text"
          style={{
            borderRadius: "5px",
            backgroundColor: "#e8e8e8",
            border: "0px",
            height: "25px",
            paddingLeft: "35px",
          }}
          placeholder="Search a country"
          onChange={(e) => searchRegion(e.target.value)}
        />
      </div>

      {search ? (
        <div
          id="resultsDiv"
          style={{ position: "absolute", zIndex: "1", width: "210px" }}
          onMouseLeave={() => setSearch(false)}
        >
          {searchResults.map((result) => (
            <div
              key={result.target}
              tabIndex={0}
              role="button"
              onKeyDown={() => adjustHomePage(result.target)}
              id={result.target}
              style={searchResultDivStyle}
              onClick={() => adjustHomePage(result.target)}
            >
              <p style={searchResultTxtStyle}>{result.target}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "none" }} />
      )}
    </div>
  );
};

export default SearchBar;
