import Dialog from "src/components/Dialog/Dialog";
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
        <Dialog title={article.headline} close={toggleOpen} modalSize="30">
          <div style={{ overflowY: "scroll" }}>
            {bookmarked ? (
              <BsHeartFill
                color="ff5c5c"
                size="2rem"
                onClick={bookmarkArticle}
              />
            ) : (
              <BsHeart color="ff5c5c" size="2rem" onClick={bookmarkArticle} />
            )}
            {article.dateOfPublication}
            {article.mainText}
          </div>
        </Dialog>
      ) : null}
      ;
    </>
  );
};

export default ArticleDialog;
