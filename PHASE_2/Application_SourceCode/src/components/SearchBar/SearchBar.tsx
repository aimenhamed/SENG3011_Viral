import { faArrowRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as stringSimilarity from "string-similarity";
import { BestMatch } from "string-similarity";
import jvmCountries from "./countries" ;

const SearchBar = () => {
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState<stringSimilarity.Rating[]>([]);

    const searchResultTxtStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: 'small',
    }

    const searchResultDivStyle = {
        backgroundColor: '#2a9763',
        padding: '1px',
        paddingLeft: '15px',
        borderBottom: '1px solid #e8e8e8',
        borderLeft: '1px solid #e8e8e8',
        borderRight: '1px solid #e8e8e8',
    }

    const regionNames: string[] = [];
    Object.entries(jvmCountries).forEach((entry) => {
        regionNames.push(entry[1].name);
    }); 
    
    const searchRegion = (searchTerm: string) => {
        // (searchTerm.length > 0) ? setSearch(true) :  setSearch(false);
        if (searchTerm.length > 0) {
            setSearch(true);
        } else {
            setSearch(false);
        }

        const bestMatchResults: BestMatch = stringSimilarity.findBestMatch(searchTerm, regionNames);
        const ratings: stringSimilarity.Rating[] = bestMatchResults.ratings; // eslint-disable-line prefer-destructuring
        ratings.sort((a, b) => b.rating - a.rating); // desc order
        const topFiveResults = ratings.slice(0, 5); // eslint-disable-line prefer-destructuring
        
        setSearchResults(topFiveResults);
	}

    return (
        <div>
			<FontAwesomeIcon icon={faMagnifyingGlass} style={{position: 'relative', right: '-25px'}} />
			<input type='text' style={{borderRadius: '5px', backgroundColor: '#e8e8e8', border: '0px', height: '25px', paddingLeft: '35px'}} placeholder='Search a country' onChange={(e) => searchRegion(e.target.value)}></input>
            
            {
                search ? (
                    <div style={{position: 'absolute', zIndex: '1'}}>
                        {searchResults.map((result) => 
                            <Link to='/' style={searchResultTxtStyle}>
                                <div style={searchResultDivStyle}>
                                    <p>{result.target}</p>
                                </div>
                            </Link>
                        )}
                        <Link to='/' style={searchResultTxtStyle}>
                            <div style={searchResultDivStyle}>
                                <p>See more</p>
                                <FontAwesomeIcon icon={faArrowRight} size="sm" />
                            </div>
                        </Link>
                    </div>)
                : (<div style={{display: 'none'}}></div>)
            }
		</div>
    );
};

export default SearchBar;