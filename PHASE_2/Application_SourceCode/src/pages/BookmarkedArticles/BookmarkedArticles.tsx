import { useState } from "react";
import { FlexLayout } from "src/components/common/layouts/screenLayout";
import Text from "src/components/common/text/Text";
import { Article } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import ArticleResult from "src/components/ArticleResult/ArticleResult";
import { useHistory } from "react-router-dom";
import ArticleDialog from "../Articles/ArticleDialog/ArticleDialog";
import { Container } from "./style";

const BookmarkedArticles = () => {
  const history = useHistory();
  const { user } = useAppSelector(selectUser);
  if (!user) history.push("/");

  const [articleDialog, setArticleDialog] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const articles = user?.user.bookmarkedArticles
    ? [...user.user.bookmarkedArticles]
    : [];
  return (
    <FlexLayout>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Text bold fontSize="2rem">
            Bookmarked Articles
          </Text>
          {user?.user.bookmarkedArticles.length === 0 ? (
            <Text>You have no bookmarked articles.</Text>
          ) : (
            articles.map((article) => (
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
  );
};

export default BookmarkedArticles;
