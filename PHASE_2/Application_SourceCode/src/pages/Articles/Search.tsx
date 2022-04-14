import { useState } from "react";
import { useDispatch } from "react-redux";
import { FlexLayout } from "src/components/common/layouts/screenLayout";
import Text from "src/components/common/text/Text";
import { keyTerms } from "src/constants/KeyTerms";
import { ISearchRequestHeaders } from "src/interfaces/ResponseInterface";
import { Article } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  getSearchDispatch,
  selectArticles,
} from "src/logic/redux/reducers/articleSlice/articleSlice";
import ArticleResult from "src/components/ArticleResult/ArticleResult";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { useHistory } from "react-router-dom";
import ArticleDialog from "./ArticleDialog/ArticleDialog";
import { Container, GenericInput, GenericLabel, GenericSelect, SearchButton } from "./style";

const Articles = () => {
  const history = useHistory();
  const { user } = useAppSelector(selectUser);
  if (!user) history.push("/");

  const dispatch = useDispatch();
  const { articles } = useAppSelector(selectArticles);

  const [location, setLocation] = useState<string>("India");
  const [startDate, setStartDate] = useState<string>("2009-09-23");
  const [endDate, setEndDate] = useState<string>("2021-09-24");
  const [term, setTerm] = useState<string>("nipah virus");

  const [articleDialog, setArticleDialog] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const results = articles ? [...articles] : [];
  const search = () => {
    const req: ISearchRequestHeaders = {
      periodOfInterest: { start: startDate, end: endDate },
      location,
      keyTerms: [term],
    };
    dispatch(getSearchDispatch(req));
  };
  return (
    <>

      <FlexLayout>
        <Container>
          <Text bold fontSize="2rem">
            Search for known outbreaks
          </Text>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <GenericLabel>Location</GenericLabel>
            <GenericInput
              placeholder="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
            <GenericLabel>Start date</GenericLabel>
            <GenericInput
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <GenericLabel>End date</GenericLabel>
            <GenericInput
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <GenericLabel>Diseases</GenericLabel>
            <GenericSelect name="diseases" onChange={(e) => setTerm(e.target.value)}>
              {keyTerms.map((keyTerm) => (
                <option key={keyTerm} value={keyTerm}>
                  {keyTerm}
                </option>
            ))}
            </GenericSelect>
            <SearchButton type="button" onClick={search}>
              Search
            </SearchButton>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <Text bold fontSize="1.5rem">
              Results
            </Text>
            {results.length === 0 ? (
              <Text>No results found.</Text>
          ) : (
            results.map((article) => (
              <ArticleResult
                article={article}
                click={() => {
                  setSelectedArticle(article);
                  setArticleDialog(true);
                }}
              />
            ))
          )}
          </div>
        </Container>
        {selectedArticle && (
        <ArticleDialog
          article={selectedArticle}
          isOpen={articleDialog}
          toggleOpen={() => setArticleDialog(false)}
        />
      )}
      </FlexLayout>
    </>

  );
};

export default Articles;
