import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Text from "src/components/common/text/Text";
import { Article } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import ArticleResult from "src/components/ArticleResult/ArticleResult";
import { AdviceLevelColors } from "src/constants/adviceLevelColors";
import ArticleDialog from "../Articles/ArticleDialog/ArticleDialog";
import { FavouritesContent, ArticleResultWrapper, ArticlesHolder, Divider, CountryTile, CountryHolder } from "./style";

const Favourites = () => {
  const history  = useHistory()
  const { all } = useAppSelector(selectAdvice);
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

  return  (
    <>
      <FavouritesContent>
        <h1 style={{ paddingLeft: '20px' }}>Favourites</h1>
        <div>
          <h2 style={{ paddingLeft: '20px' }}>Countries</h2>
          <Divider />
        </div>
        <CountryHolder>
          {countries.map((country) => {
            console.log(all);
            console.log(country);
            const adviceLevel = all?.countries.find(c  => c.country===country.code)!.adviceLevel;
            const bgColor = AdviceLevelColors[adviceLevel || 'Safe to travel'];
            return (
              <>
                <CountryTile key={country.countryId} color={bgColor} onClick={()=>history.push(`/country/${country.name}`)}>
                  <Text bold>{country.name}</Text>
                </CountryTile>
              </>
)
          })}
        </CountryHolder>
        <div>
          <h2 style={{ paddingLeft: '20px' }}>Articles</h2>
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
