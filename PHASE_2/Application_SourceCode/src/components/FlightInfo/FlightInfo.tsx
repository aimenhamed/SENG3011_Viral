import { Flight } from "src/interfaces/ViralInterface";
import Text from "../common/text/Text";

type FlightInfoProps = {
  flight: Flight;
};

const FlightInfo = ({ flight }: FlightInfoProps) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text fontSize="1.5rem" style={{ paddingRight: "1rem" }}>
          {flight.departure}
        </Text>
        <Text fontSize="1.5rem">{` -> `}</Text>
        <Text fontSize="1.5rem" style={{ paddingLeft: "1rem" }}>
          {flight.arrival}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text fontSize="1.5rem" style={{ paddingRight: "0.5rem" }}>
          {flight.departureTime}
        </Text>
        <Text fontSize="1.5rem" style={{ paddingLeft: "0.5rem" }}>
          {flight.arrivalTime}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text fontSize="1.5rem" style={{ paddingRight: "0.5rem" }}>
          {flight.duration} flight
        </Text>
        <Text fontSize="1.5rem" style={{ paddingLeft: "0.5rem" }}>
          ${flight.price} per adult
        </Text>
      </div>
    </div>
  );
};

export default FlightInfo;
