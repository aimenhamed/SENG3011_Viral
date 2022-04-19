import { useEffect, useState } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { useDispatch } from "react-redux";
import { keyTerms } from "src/constants/KeyTerms";
import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import {
  putBookmarkCountryDispatch,
  selectUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { Article, Country } from "src/interfaces/ViralInterface";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import {
  getSearchDispatch,
  selectArticles,
  ArticleLoadingStatusTypes,
} from "src/logic/redux/reducers/articleSlice/articleSlice";
import {
  IAdviceSpecificSuccessResponse,
  ISearchRequestHeaders,
  IUserBookmarkCountryRequestBody,
} from "src/interfaces/ResponseInterface";
import { useHistory } from "react-router-dom";
import ArticleDialog from "src/pages/Articles/ArticleDialog/ArticleDialog";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import {
  ISeries,
  ISVGElementStyleAttributes,
} from "@react-jvectormap/core/dist/types";
import { AdviceLevelColors } from "src/constants/adviceLevelColors";
import ArticleResult from "../ArticleResult/ArticleResult";
import Flights from "../Flights/Flights";
import Text from "../common/text/Text";
import { FlexLayout } from "../common/layouts/screenLayout";
import {
  Container,
  Content,
  Section,
  SubSection,
  TileLockup,
  Tile,
  HorizontalTile,
  Divider,
} from "./style";
import AddCommentDialog from "../AddCommentDialog/AddCommentDialog";
import Collapsible from "./Collapsible";
import jvmCountries from "../SearchBar/countries";
import ReviewBox from "../ReviewBox/ReviewBox";

interface IFocus {
  scale: number;
  x: number;
  y: number;
  region?: string;
  lat?: number;
  lng?: number;
  animate?: boolean;
}

type CountryReportProps = {
  advice: IAdviceSpecificSuccessResponse;
  country: string;
};

const CountryReport = ({ advice, country }: CountryReportProps) => {
  let countryCode: string | undefined;
  let adviceLvl: string | undefined;

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useAppSelector(selectUser);
  const { all } = useAppSelector(selectAdvice);
  const { articles, articleloadingStatus } = useAppSelector(selectArticles);

  const [commentDialog, setCommentDialog] = useState<boolean>(false);
  const bookmarked = user?.user.bookmarkedCountries.filter(
    (c) => advice.country.countryId === c.countryId
  ) as Country[];

  const isBookmarked = bookmarked.length > 0;

  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();
  const [isArticleDialogOpen, setIsArticleDialogOpen] =
    useState<boolean>(false);

  const renderText = (text: string[]) =>
    text.map((req) => (
      <Text key={req} fontSize="1.25rem" lineHeight="2rem" align="left">
        {req}
      </Text>
    ));

  useEffect(() => {
    if (!user) history.push("/");
    const req: ISearchRequestHeaders = {
      keyTerms,
      location: country,
      periodOfInterest: { start: "2009-09-23", end: "2021-09-24" },
    };
    dispatch(getSearchDispatch(req));
  }, []);

  const bookmarkCountry = () => {
    const req: IUserBookmarkCountryRequestBody = {
      userId: user?.user.userId!,
      countryId: advice.country.countryId,
      status: !isBookmarked,
    };

    dispatch(putBookmarkCountryDispatch(req));
  };
  const showArticles = () => {
    if (articleloadingStatus === ArticleLoadingStatusTypes.GET_SEARCH_LOADING) {
      return <Text>Loading...</Text>;
    } else if (articles.length > 0) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            whiteSpace: "nowrap",
            maxHeight: "200px",
            overflowX: "scroll",
            overflowY: "hidden",
            padding: "5px",
          }}
        >
          {articles.map((article) => (
            <ArticleResult
              key={article.articleId}
              article={article}
              click={() => {
                setSelectedArticle(article);
                setIsArticleDialogOpen(true);
              }}
            />
          ))}
        </div>
      );
    } else {
      return <Text>Loading</Text>;
    }
  };

  const regionStyle: ISVGElementStyleAttributes = {
    initial: {
      fill: "#8b8b8b",
    },
  };

  Object.entries(jvmCountries).forEach((entry) => {
    const currCountry = entry[1]["name"];
    if (currCountry === country) {
      const [countryName] = entry;
      countryCode = countryName;
    }
  });

  const AdviceLevel: {
    [key: string]: string;
  } = AdviceLevelColors;

  const values: {
    [key: string]: number;
  } = {};
  all?.countries.forEach((curr) => {
    if (countryCode === curr["country"]) {
      adviceLvl = curr["adviceLevel"];
      values[countryCode] = AdviceLevel[adviceLvl] as unknown as number;
    }
  });

  const seriesStyle: ISeries = {
    regions: [
      {
        values,
        attribute: "fill",
      },
    ],
  };

  const selectedRegion: IFocus = {
    scale: 500,
    x: 100,
    y: 100,
    region: countryCode,
  };

  return (
    <FlexLayout>
      <Container>
        <Text bold fontSize="2rem" align="left">
          {advice.country.name}
        </Text>
        {advice.country.advice ? (
          <Tile
            style={{
              marginBottom: "1rem",
              background: AdviceLevel[advice.country.advice.adviceLevel],
            }}
          >
            {advice.country.advice.adviceLevel}
          </Tile>
        ) : (
          <Tile
            style={{
              marginBottom: "16px",
              background: AdviceLevel["Safe to travel"],
            }}
          >Safe to travel
          </Tile>
        )}
        <Content>
          <Section id="left" style={{ marginRight: "2.5rem" }}>
            <SubSection style={{ justifyContent: "center" }}>
              <TileLockup>
                {isBookmarked ? (
                  <BsHeartFill
                    color="#ff5c5c"
                    size="2rem"
                    onClick={bookmarkCountry}
                  />
                ) : (
                  <BsHeart
                    color="#ff5c5c"
                    size="2rem"
                    onClick={bookmarkCountry}
                  />
                )}
                <div style={{ width: "600px", height: "600px" }}>
                  <VectorMap
                    map={worldMill}
                    focusOn={selectedRegion}
                    backgroundColor="white"
                    regionStyle={regionStyle}
                    series={seriesStyle}
                  />
                </div>
              </TileLockup>
            </SubSection>
          </Section>
          <Section id="right">
            <ReviewBox
              reviews={advice.country.reviews}
              averageRating={advice.countryRating}
            />
          </Section>
          <AddCommentDialog
            countryId={advice.country.countryId}
            isOpen={commentDialog}
            toggleOpen={() => setCommentDialog(false)}
          />
        </Content>
        <Collapsible
          aIcon={AllIcons.faHand}
          title={`Travel Advice  - Last updated: ${advice.country.advice ? advice.country.advice.lastUpdate : 'N/A'}`}
        >
          <Tile style={{ textAlign: "left" }}>
            <Text fontSize="1.25rem" lineHeight="2rem">
              {advice.country.advice ? advice.country.advice.latestAdvice : 'No travel advice found.'}
            </Text>
          </Tile>
        </Collapsible>
        <Divider />
        <Collapsible aIcon={AllIcons.faSyringe} title="Vaccine Requirements">
          <Tile style={{ textAlign: "left" }}>
            {advice.data.data.areaAccessRestriction.diseaseVaccination
              .qualifiedVaccines ? (
              renderText(
                advice.data.data.areaAccessRestriction.diseaseVaccination
                  .qualifiedVaccines
              )
            ) : (
              <Text>No required vaccines to travel.</Text>
            )}
          </Tile>
        </Collapsible>
        <Divider />
        <Collapsible aIcon={AllIcons.faPlane} title="Flight Information">
          <Flights country={country} />
        </Collapsible>
        <Divider />
        <Collapsible aIcon={AllIcons.faDisease} title="Disease Outbreaks">
          <HorizontalTile>{showArticles()}</HorizontalTile>
        </Collapsible>
        <Divider />
      </Container>
      {selectedArticle ? (
        <ArticleDialog
          article={selectedArticle}
          isOpen={isArticleDialogOpen}
          toggleOpen={() => setIsArticleDialogOpen(false)}
        />
      ) : null}
    </FlexLayout>
  );
};

export default CountryReport;
