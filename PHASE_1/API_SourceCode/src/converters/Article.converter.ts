import { Article } from "IArticle";
import { ArticleEntity } from "../entity/Article.entity";
import { convertReportEntityToInterface } from "./Report.converter";

export const convertArticleEntityToInterface = (
  entity: ArticleEntity
): Article => {
  return {
    articleId: entity.articleId,
    url: entity.url,
    dateOfPublication: entity.dateOfPublication,
    headline: entity.headline,
    mainText: entity.mainText,
    reports: entity.reports.map((report) =>
      convertReportEntityToInterface(report)
    ),
  };
};
