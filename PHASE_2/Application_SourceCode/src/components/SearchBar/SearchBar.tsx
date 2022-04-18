import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import { ViralPage } from "src/pages/Home/Home";
import * as stringSimilarity from "string-similarity";
import { BestMatch } from "string-similarity";
import jvmCountries from "./countries";
import { SearchInputBar, ResultsParentDiv, SearchResultDiv, SearchResultTxt } from "./style";

interface SearchProps {
  setHeading: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchProps> = ({ setHeading }) => {
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<stringSimilarity.Rating[]>(
    []
  );

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
              onKeyDown={() => adjustHomePage(result.target)}
              id={result.target}
              onClick={() => searchRegion(result.target)}
            >
              <SearchResultTxt>{result.target}</SearchResultTxt>
            </SearchResultDiv>
          ))}
        </ResultsParentDiv>
      ) : (
        <div style={{ display: "none" }} />
      )}
    </div>
  );
};

export default SearchBar;
