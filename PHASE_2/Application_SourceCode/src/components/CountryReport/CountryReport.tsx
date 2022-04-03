import { Advice } from "src/interfaces/ViralInterface";
import {
  Container,
  Content,
  Section,
  SubSection,
  TileLockup,
  Tile,
  SubText,
} from "./style";
import Text from "../common/text/Text";
import Map from "../Map/Map";
import { FlexLayout } from "../common/layouts/screenLayout";

type CountryReportProps = {
  advice: Advice;
};

const vaxReq: string[] = ["Johnson & Johnson", "Astrazenica"];
const travAdvice: string[] = ["Exercise a high degree of caution", "Very bad"];

const CountryReport = ({ advice }: CountryReportProps) => {
  const renderText = (text: string[]) =>
    text.map((req) => <Text key={req}>{req}</Text>);

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
                <Tile>{renderText(vaxReq)}</Tile>
              </TileLockup>
            </SubSection>
            <SubSection>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Articles
                </Text>
                <Tile>{renderText(vaxReq)}</Tile>
              </TileLockup>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Disease Report
                </Text>
                <Tile>{renderText(vaxReq)}</Tile>
              </TileLockup>
            </SubSection>
          </Section>
          <Section id="right">
            <TileLockup style={{ width: "50%" }}>
              <Text bold fontSize="1.125rem" align="center">
                Travel Advice
                <SubText>
                  {` - Last updated: ${advice.lastUpdate.toDateString()}`}
                </SubText>
              </Text>
              <Tile style={{ marginBottom: "1rem" }}>{advice.adviceLevel}</Tile>
              <Tile style={{ textAlign: "left" }}>{advice.latestAdvice}</Tile>
            </TileLockup>
            <TileLockup>
              <Text bold fontSize="1.125rem" align="center">
                Flight Info
              </Text>
              <Tile>{renderText(travAdvice)}</Tile>
            </TileLockup>
          </Section>
        </Content>
      </Container>
    </FlexLayout>
  );
};

export default CountryReport;
