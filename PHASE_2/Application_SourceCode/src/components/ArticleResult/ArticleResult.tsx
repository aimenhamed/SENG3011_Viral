import { Article } from "src/interfaces/ViralInterface";
import Text from "src/components/common/text/Text";
import { Container } from "./style";

interface ArticleResultProps {
  article: Article;
  click: () => void;
}

const ArticleResult = ({ article, click }: ArticleResultProps) => {
  return (
    <Container key={article.articleId} onClick={click}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          // overflowX: "auto",
          width: "100%",
          height: "100%",
        }}
      >
        <Text bold>{article.headline}</Text>
        <Text>{article.dateOfPublication}</Text>
      </div>
      <div style={{ height: "1.5rem" }}>
        <Text
          style={{
            height: "1.5rem",
            whiteSpace: "nowrap",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.mainText}
        </Text>
      </div>
      <Text>
        <b>Report Count:</b> {article.reports.length}
      </Text>
    </Container>
  );
};

export default ArticleResult;
