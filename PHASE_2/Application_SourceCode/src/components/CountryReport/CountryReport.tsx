import { useEffect } from "react";
import { AmadeusData } from "src/interfaces/ResponseInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { Advice } from "src/interfaces/ViralInterface";
import { useDispatch } from "react-redux";
import {
  getFlightsDispatch,
  LoadingStatusTypes,
  selectFlights,
} from "src/logic/redux/reducers/flightsSlice/flightsSlice";
import {
  getSearchDispatch,
  selectArticles,
  ArticleLoadingStatusTypes,
} from "src/logic/redux/reducers/articleSlice/articleSlice";
import Text from "../common/text/Text";
import Map from "../Map/Map";
import { FlexLayout } from "../common/layouts/screenLayout";
import {
  Container,
  Content,
  Section,
  SubSection,
  TileLockup,
  Tile,
  SubText,
} from "./style";
import FlightInfo from "../FlightInfo/FlightInfo";

type CountryReportProps = {
  advice: Advice;
  data: AmadeusData;
  // comments?: Comment[];
};

const CountryReport = ({ advice, data }: CountryReportProps) => {
  const dispatch = useDispatch();
  const { flights, loadingStatus } = useAppSelector(selectFlights);
  const { articles, articleloadingStatus } = useAppSelector(selectArticles);

  const renderText = (text: string[]) =>
    text.map((req) => <Text key={req}>{req}</Text>);
  useEffect(() => {
    dispatch(getFlightsDispatch());
    dispatch(getSearchDispatch(advice.country.name));
  }, []);

  return (
    <FlexLayout>
      <Container>
        <Text bold fontSize="2rem" align="center">
          {advice.country.name}
        </Text>
        <Content>
          <Section id="left" style={{ marginRight: "2.5rem" }}>
            <SubSection>
              <TileLockup style={{ width: "50%" }}>
                <Text bold fontSize="1.125rem" align="center">
                  {advice.country.name} Map - Continent {advice.continent}
                </Text>
                <Map />
              </TileLockup>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Vaccine Requirements
                </Text>
                <Tile>
                  {renderText(
                    data.areaAccessRestriction.diseaseVaccination
                      .qualifiedVaccines
                  )}
                </Tile>
              </TileLockup>
            </SubSection>
            <SubSection>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Articles
                </Text>
                <Tile>
                  {articleloadingStatus ===
                  ArticleLoadingStatusTypes.GET_SEARCH_LOADING ? (
                    <Text>Loading...</Text>
                  ) : (
                    articles.map((article) => (
                      <Text key={article.articleId}>{article.headline}</Text>
                    ))
                  )}
                </Tile>
              </TileLockup>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Disease Report
                </Text>
                <Tile>
                  <Text>{data.diseaseCases.date}</Text>
                  <Text>Deaths Reported: {data.diseaseCases.deaths}</Text>
                  <Text>Disease Cases: {data.diseaseCases.confirmed}</Text>
                </Tile>
              </TileLockup>
            </SubSection>
          </Section>
          <Section id="right">
            <TileLockup style={{ width: "50%" }}>
              <Text bold fontSize="1.125rem" align="center">
                Travel Advice
                <SubText>{` - Last updated: ${advice.lastUpdate}`}</SubText>
              </Text>
              <Tile style={{ marginBottom: "1rem" }}>{advice.adviceLevel}</Tile>
              <Tile style={{ textAlign: "left" }}>{advice.latestAdvice}</Tile>
            </TileLockup>
            <TileLockup style={{ width: "50%" }}>
              <Text bold fontSize="1.125rem" align="center">
                Available flights to {advice.country.name}
              </Text>
              <Tile>
                {loadingStatus === LoadingStatusTypes.GET_FLIGHTS_LOADING ? (
                  <Text>Loading...</Text>
                ) : (
                  flights.map((flight) => (
                    <FlightInfo flight={flight} key={flight.price} />
                  ))
                )}
              </Tile>
            </TileLockup>
          </Section>
        </Content>
      </Container>
    </FlexLayout>
  );
};

export default CountryReport;
