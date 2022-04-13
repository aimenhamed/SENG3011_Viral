import { useState } from "react";
import { useDispatch } from "react-redux";
import { IFlightQuery } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  getFlightsDispatch,
  selectFlights,
  LoadingStatusTypes,
} from "src/logic/redux/reducers/flightsSlice/flightsSlice";
import Text from "../common/text/Text";
import FlightItem from "./FlightItem/FlightItem";
import { Image } from "../common/image/Image";
import { LoadingAnimation } from "../common/image/imageIndex";
import {
  Row,
  Column,
  Search,
  GenericInput,
  Results,
  SearchButton,
  ButtonLockup,
} from "./style";

const Flights = () => {
  const dispatch = useDispatch();

  const [originCode, setOriginCode] = useState<string>("SYD");
  const [destCode, setDestCode] = useState<string>("BKK");
  const [departDate, setDepartDate] = useState<string>("2022-11-01");
  const [numAdults, setNumAdults] = useState<string>("1");

  const { flights, loadingStatus } = useAppSelector(selectFlights);

  const changeAdults = (val: string) => {
    if (parseInt(val, 10) < 1) {
      return;
    }
    if (val === "") {
      setNumAdults("1");
    } else {
      setNumAdults(val);
    }
  };

  const getFlightInfo = () => {
    const req: IFlightQuery = {
      originLocationCode: originCode,
      destinationLocationCode: destCode,
      departureDate: departDate,
      adults: numAdults,
    };
    dispatch(getFlightsDispatch(req));
  };
  return (
    <>
      <Search>
        <Text
          noMargin
          color="white"
          bold
          fontSize="1.5rem"
          style={{ marginTop: "1rem" }}
        >
          Search Flight
        </Text>
        <Row style={{ margin: "1rem 0", justifyContent: "space-between" }}>
          <Column>
            <Row>
              <Text color="white">Origin Location Code</Text>
              <GenericInput
                value={originCode}
                type="text"
                onChange={(e) => setOriginCode(e.target.value)}
              />
            </Row>
            <Row>
              <Text color="white">Destination Location Code</Text>
              <GenericInput
                value={destCode}
                type="text"
                onChange={(e) => setDestCode(e.target.value)}
              />
            </Row>
          </Column>
          <Column>
            <Row>
              <Text color="white">Departure Date</Text>
              <GenericInput
                value={departDate}
                type="date"
                onChange={(e) => setDepartDate(e.target.value)}
              />
            </Row>
            <Row>
              <Text color="white">Number of adults</Text>
              <GenericInput
                value={numAdults}
                type="number"
                onChange={(e) => changeAdults(e.target.value)}
              />
            </Row>
          </Column>
        </Row>
        <ButtonLockup>
          <SearchButton onClick={getFlightInfo}>Search</SearchButton>
        </ButtonLockup>
      </Search>
      <Results>
        {loadingStatus === LoadingStatusTypes.IDLE && <></>}
        {loadingStatus === LoadingStatusTypes.GET_FLIGHTS_LOADING && (
          <Image src={LoadingAnimation} width="600px" />
        )}
        {loadingStatus === LoadingStatusTypes.GET_FLIGHTS_COMPLETED &&
          flights.map((flight) => (
            <FlightItem key={flight.duration + flight.price} flight={flight} />
          ))}
      </Results>
    </>
  );
};

export default Flights;
