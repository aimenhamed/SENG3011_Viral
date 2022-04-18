import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Text from "src/components/common/text/Text";
import { Article } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import ArticleResult from "src/components/ArticleResult/ArticleResult";
import ArticleDialog from "../Articles/ArticleDialog/ArticleDialog";
import { FavouritesContent, ArticleResultWrapper, ArticlesHolder, Divider } from "./style";

const Favourites = () => {
  const history  = useHistory()
  const { advice } = useAppSelector(selectAdvice);
  const { user }  = useAppSelector(selectUser);
  if (!user) history.push("/");

  const [articleDialog, setArticleDialog] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const countries = user?.user.bookmarkedCountries
  ? [...user.user.bookmarkedCountries]
  : [];

  const articles = user?.user.bookmarkedArticles
    ? [...user.user.bookmarkedArticles]
    : [];

  useEffect(() => {
    console.log(articleDialog, selectedArticle,advice);
  })

  return  (
    <>
      <FavouritesContent>
        <h1>Favourites</h1>
        <div>
          <h2>Countries</h2>
          <Divider />
        </div>
        <div>
          {countries.map((country) => (
            <button type="button" onClick={()=>console.log(`clicked ${country.name}`)}>
              {country.name}
            </button>
        )
        )}
        </div>
        <div>
          <h2>Articles</h2>
          <Divider />
        </div>
        <ArticlesHolder>
          {user?.user.bookmarkedArticles.length === 0 ? (
            <Text>You have no bookmarked articles.</Text>
          ) : (
            articles.map((article) => (
              <ArticleResultWrapper>
                <ArticleResult
                  article={article}
                  click={() => {
                      setSelectedArticle(article);
                      setArticleDialog(true);
                  }}

                />
              </ArticleResultWrapper>

            ))
          )}
        </ArticlesHolder>
        {selectedArticle && (
        <ArticleDialog
          article={selectedArticle}
          isOpen={articleDialog}
          toggleOpen={() => setArticleDialog(false)}
        />
      )}
      </FavouritesContent>
    </>
)
}

export default Favourites;
