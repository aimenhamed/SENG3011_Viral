import { Flight } from "src/interfaces/ViralInterface";
import Text from "src/components/common/text/Text";
import { Column, Item, Price, Row } from "./style";

type FlightItemProps = {
  flight: Flight;
};

const FlightItem = ({ flight }: FlightItemProps) => {
  return (
    <Item>
      <Row>
        <Column style={{ marginRight: "1rem" }}>
          <Text align="center" bold>
            Departure
          </Text>
          <Text align="center" noMargin>
            {flight.departure}
          </Text>
          <Text align="center" noMargin>
            {flight.departureTime}
          </Text>
        </Column>
        <Column>
          <Text align="center" bold>
            Arrival
          </Text>
          <Text align="center" noMargin>
            {flight.arrival}
          </Text>
          <Text align="center" noMargin>
            {flight.arrivalTime}
          </Text>
        </Column>
      </Row>
      <Text align="center">{flight.duration}</Text>
      <Price>${flight.price}</Price>
    </Item>
  );
};

export default FlightItem;
