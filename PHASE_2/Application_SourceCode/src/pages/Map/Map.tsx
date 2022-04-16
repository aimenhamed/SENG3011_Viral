import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import {
  ISeries,
  ISVGElementStyleAttributes,
} from "@react-jvectormap/core/dist/types";
import SearchBar from "src/components/SearchBar/SearchBar";
import Legend from "src/components/Legend/Legend";
import { useEffect, useState } from "react";
import jvmCountries from "src/components/SearchBar/countries";
import { useDispatch } from "react-redux";
import {
  getAdviceAllDispatch,
  selectAdvice,
} from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { useAppSelector } from "src/logic/redux/hooks";
import { MapContainer, MapPageHeader, MapPagePaddedContainer, MapPageParentContainer } from "./style";

type MapProps = {
  countryClick: (countryName: string) => void;
};

const AdviceLevel: {
  [key: string]: string;
} = {
  "Do not travel": "#e95757",
  "Exercise a high degree of caution": "#f6d34e",
  "Reconsider your need to travel": "#f1902c",
};

const Map = ({ countryClick }: MapProps) => {
  const dispatch = useDispatch();

  const { all } = useAppSelector(selectAdvice);

  const values: {
    [key: string]: number;
  } = {};
  all?.countries.forEach((country) => {
    const countryCode = country.country;
    const advLvl = country.adviceLevel;
    values[countryCode] = AdviceLevel[advLvl] as unknown as number;
  });
  const [heading, setHeading] = useState("Select a destination");

  const regionStyle: ISVGElementStyleAttributes = {
    initial: {
      fill: "#5dbc60",
    },
  };

  const seriesStyle: ISeries = {
    regions: [
      {
        // values,
        attribute: "fill",
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdviceAllDispatch());
  }, []);

  const regionClick = (e: Event, c: string) => {
    const country = Object.entries(jvmCountries).filter((obj) => obj[0] === c);
    countryClick(country[0][1]["name"]);
    const regionHoverTips = document.getElementsByClassName("jvectormap-tip");
    if (regionHoverTips[0].parentNode != null) {
      while (regionHoverTips.length > 0) {
        regionHoverTips[0].parentNode.removeChild(regionHoverTips[0]);
      }
    }
  };

  return (
    <MapPageParentContainer>
      <MapPagePaddedContainer>
        <MapPageHeader>
          <div>
            <h1>{heading}</h1>
          </div>
          <SearchBar setHeading={setHeading} />
        </MapPageHeader>
        <MapContainer>
          <VectorMap
            map={worldMill}
            onRegionClick={(e, c) => regionClick(e, c)}
            backgroundColor="white"
            regionStyle={regionStyle}
            series={seriesStyle}
          />
          <Legend />
        </MapContainer>
      </MapPagePaddedContainer>
    </MapPageParentContainer>
  );
};

export default Map;
