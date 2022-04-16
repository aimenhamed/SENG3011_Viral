import { useEffect, useState } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { useDispatch } from "react-redux";
import { keyTerms } from "src/constants/KeyTerms";
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
import { IFocus, ISeries, ISVGElementStyleAttributes } from "@react-jvectormap/core/dist/types";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
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
  SubText,
} from "./style";
import CommentCard from "../Comment/Comment";
import AddCommentDialog from "../AddCommentDialog/AddCommentDialog";
import jvmCountries from "../SearchBar/countries";

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
    text.map((req) => <Text key={req}>{req}</Text>);

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
            width: "300px",
            maxHeight: "200px",
            overflowY: "scroll",
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
    const currCountry = entry[1]['name']

    if (currCountry === country) {
      const [countryName] = entry
      countryCode = countryName 
    }
  });

  const AdviceLevel: {
    [key: string]: string;
  } = {
    null : "#5dbc60",
    "Do not travel": "#e95757",
    "Exercise a high degree of caution": "#f6d34e",
    "Reconsider your need to travel": "#f1902c",
  };

  const values: {
    [key: string]: number;
  } = {};
  all?.countries.forEach((curr) => {
    if (countryCode === curr['country']) {
      adviceLvl = curr['adviceLevel']
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
        <Text bold fontSize="2rem" align="center">
          {advice.country.name}
        </Text>
        <Content>
          <Section id="left" style={{ marginRight: "2.5rem" }}>
            <SubSection>
              <TileLockup style={{ width: "50%" }}>
                <Text bold fontSize="1.125rem" align="center">
                  {advice.country.name} Map
                </Text>
                {isBookmarked ? (
                  <BsHeartFill
                    color="ff5c5c"
                    size="2rem"
                    onClick={bookmarkCountry}
                  />
                ) : (
                  <BsHeart
                    color="ff5c5c"
                    size="2rem"
                    onClick={bookmarkCountry}
                  />
                )}
                <div style={{width: "300px", height: "300px"}}>
                  <VectorMap
                    map={worldMill}
                    focusOn={selectedRegion}
                    backgroundColor="white"
                    regionStyle={regionStyle}
                    series={seriesStyle}
                  />
                </div>
              </TileLockup>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Vaccine Requirements
                </Text>
                <Tile>
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
              </TileLockup>
            </SubSection>
            <SubSection>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Articles
                </Text>
                <Tile>{showArticles()}</Tile>
              </TileLockup>
              <TileLockup>
                <Text bold fontSize="1.125rem" align="center">
                  Disease Report
                </Text>
                <Tile>
                  <Text>{advice.data.data.diseaseCases.date}</Text>
                  <Text>
                    Deaths Reported: {advice.data.data.diseaseCases.deaths}
                  </Text>
                  <Text>
                    Disease Cases: {advice.data.data.diseaseCases.confirmed}
                  </Text>
                </Tile>
              </TileLockup>
            </SubSection>
            <SubSection style={{ width: "100%" }}>
              <TileLockup style={{ width: "100%" }}>
                <Text bold fontSize="1.125rem" align="center">
                  Comments
                </Text>
                <div
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      width: "fit-content",
                      background: "green",
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setCommentDialog(true)}
                    onKeyDown={() => setCommentDialog(true)}
                  >
                    <Text noMargin color="white" bold>
                      Add comment
                    </Text>
                  </div>
                </div>
                <Tile>
                  {advice.country.comments.length === 0 ? (
                    <Text>No comments posted yet.</Text>
                  ) : (
                    advice.country.comments.map((comment) => (
                      <CommentCard key={comment.commentId} comment={comment} />
                    ))
                  )}
                </Tile>
              </TileLockup>
            </SubSection>
          </Section>
          <Section id="right">
            <TileLockup style={{ width: "50%" }}>
              <Text bold fontSize="1.125rem" align="center">
                Travel Advice
                {advice.country.advice && (
                  <SubText>{` - Last updated: ${advice.country.advice.lastUpdate}`}</SubText>
                )}
              </Text>
              {advice.country.advice ? (
                <>
                  <Tile style={{ marginBottom: "1rem" }}>
                    {advice.country.advice.adviceLevel}
                  </Tile>
                  <Tile style={{ textAlign: "left" }}>
                    {advice.country.advice.latestAdvice}
                  </Tile>
                </>
              ) : (
                <>
                  <Tile style={{ textAlign: "left" }}>No advice found.</Tile>
                </>
              )}
            </TileLockup>
            <Flights country={country} />
          </Section>
          <AddCommentDialog
            countryId={advice.country.countryId}
            isOpen={commentDialog}
            toggleOpen={() => setCommentDialog(false)}
          />
        </Content>
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
