import Dialog from "src/components/Dialog/Dialog";
import Text from "src/components/common/text/Text";
import { Article } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  putBookmarkArticleDispatch,
  selectUser,
} from "src/logic/redux/reducers/userSlice/userSlice";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { IUserBookmarkArticleRequestBody } from "src/interfaces/ResponseInterface";

type ArticleDialogProps = {
  article: Article;
  isOpen: boolean;
  toggleOpen: () => void;
};

const ArticleDialog = ({ article, isOpen, toggleOpen }: ArticleDialogProps) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);
  const bookmarkedArticles = user?.user.bookmarkedArticles
    ? [...user.user.bookmarkedArticles]
    : [];

  const bookmarked =
    bookmarkedArticles.filter((a) => article.articleId === a.articleId).length >
    0;

  const bookmarkArticle = () => {
    const req: IUserBookmarkArticleRequestBody = {
      userId: user?.user.userId!,
      articleId: article.articleId,
      status: !bookmarked,
    };
    dispatch(putBookmarkArticleDispatch(req));
  };
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} modalSize="50">
          <div style={{ padding: "1rem" }}>
            <div style={{display: "flex",justifyContent: "space-between"}}>
              <Text bold fontSize="2rem" style={{margin: 0}}>{article.headline}</Text>
              {bookmarked ? (
                <BsHeartFill
                  color="#ff5c5c"
                  size="2rem"
                  onClick={bookmarkArticle}
                />
              ) : (
                <BsHeart color="#ff5c5c" size="2rem" onClick={bookmarkArticle} />
              )}
            </div>
            <Text><b>Date of Publication:</b> {article.dateOfPublication}</Text>
            <div style={{overflowY: "scroll", height: "50vh",}}>
              <Text style={{whiteSpace: 'pre-wrap' }}>{article.mainText}</Text>
              <Text><b>Source:</b> <a href={article.url}>{article.url}</a></Text>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

export default ArticleDialog;
