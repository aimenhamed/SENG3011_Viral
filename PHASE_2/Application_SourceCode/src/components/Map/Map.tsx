import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json";

const Map = () => (
  <div style={{ paddingLeft: "2rem" }}>
    <ComposableMap width={600}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} />;
          })
        }
      </Geographies>
    </ComposableMap>
  </div>
);

export default Map;
