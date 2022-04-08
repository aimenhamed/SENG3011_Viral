import { useEffect, useState } from "react";
import { useAppSelector } from "src/logic/redux/hooks";
import { useDispatch } from "react-redux";
import {
  getFlightsDispatch,
  LoadingStatusTypes,
  selectFlights,
} from "src/logic/redux/reducers/flightsSlice/flightsSlice";
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
  IFlightQuery,
} from "src/interfaces/ResponseInterface";
import { useHistory } from "react-router-dom";
import ArticleDialog from "src/pages/Articles/ArticleDialog/ArticleDialog";
import ArticleResult from "../ArticleResult/ArticleResult";
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
import CommentCard from "../Comment/Comment";
import AddCommentDialog from "../AddCommentDialog/AddCommentDialog";


type CountryReportProps = {
  advice: IAdviceSpecificSuccessResponse;
  country: string;
};

const CountryReport = ({ advice, country }: CountryReportProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useAppSelector(selectUser);

  const { flights, loadingStatus } = useAppSelector(selectFlights);
  const { articles, articleloadingStatus } = useAppSelector(selectArticles);
  const [ originCode, setOriginCode ] = useState<string>("SYD");
  const [ destCode, setDestCode ]  = useState<string>("BKK");
  const [ departDate,  setDepartDate ] = useState<string>("2022-11-01");
  const [ numAdults, setNumAdults ] = useState<string>("1");
  const [commentDialog, setCommentDialog] = useState<boolean>(false);
  const bookmarked = user?.user.bookmarkedCountries.filter(
    (c) => advice.country.countryId === c.countryId
  ) as Country[];

  const [ selectedArticle,  setSelectedArticle ] = useState<Article | undefined>()
  const [ isArticleDialogOpen, setIsArticleDialogOpen ] = useState<boolean>(false);

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
      status: !bookmarked,
    };
    dispatch(putBookmarkCountryDispatch(req));
  };

  const getFlightInfo = () => {
    const req: IFlightQuery = {
      originLocationCode: originCode,
      destinationLocationCode: destCode,
      departureDate: departDate,
      adults: numAdults,
    }
    dispatch(getFlightsDispatch(req));
  }
  const showArticles = () => {
    if (articleloadingStatus === ArticleLoadingStatusTypes.GET_SEARCH_LOADING) {
      return (<Text>Loading...</Text>)
    } else if (articles.length > 0 ) {
        return (
          <div style={{width:'300px', maxHeight: '200px', overflowY: "scroll", padding: "5px"}}>
            {articles.map((article) => (
              <ArticleResult
                article={article}
                click={()=>{
                setSelectedArticle(article);
                setIsArticleDialogOpen(true)
              }}
              />
))}
          </div>
        )
    } else {
      return <Text>Loading</Text>
    }
  }
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
                {bookmarked.length > 0 ? (
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
                <Map />
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
                <Tile>
                  {showArticles()}
                </Tile>
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
              {advice.country.advice ? 
                <>
                  <Tile style={{ marginBottom: "1rem" }}>
                    {advice.country.advice.adviceLevel}
                  </Tile>
                  <Tile style={{ textAlign: "left" }}>
                    {advice.country.advice.latestAdvice}
                  </Tile>
                </>
              : 
                <>
                  <Tile style={{ textAlign: "left" }}>
                    No advice found.
                  </Tile>
                </>
              }
              
            </TileLockup>
            <TileLockup>
              <Text bold fontSize="1.125rem" align="center">
                Available flights to {advice.country.name}
              </Text>
              <Tile>
                <input type="text" placeholder="Start location code" onChange={(e)=>setOriginCode(e.target.value)} value="SYD" />
                <input type="text" placeholder="Destination location code" onChange={(e)=>setDestCode(e.target.value)} value="BKK" />
                <input type="date" placeholder={new Date().toLocaleString()} onChange={(e)=>setDepartDate(e.target.value)} value="2022-11-01" />
                <input type="number" placeholder="Number of adults" onChange={(e)=>setNumAdults(e.target.value as string)} value="1" />
                <button type="button" onClick={()=>getFlightInfo()}>Submit</button>
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
          <AddCommentDialog
            countryId={advice.country.countryId}
            isOpen={commentDialog}
            toggleOpen={() => setCommentDialog(false)}
          />
        </Content>
      </Container>
      {
        selectedArticle
        ? (
          <ArticleDialog
            article={selectedArticle}
            isOpen={isArticleDialogOpen}
            toggleOpen={() => setIsArticleDialogOpen(false)}
          />
)
        : null
      }

    </FlexLayout>
  );
};

export default CountryReport;
