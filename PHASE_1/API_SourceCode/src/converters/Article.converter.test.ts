import {
  getArticleEntity,
  getMockArticles,
  getMockReports,
} from "../utils/testData";
import { convertArticleEntityToInterface } from "./Article.converter";

describe("convertArticleEntityToInterface", () => {
  it("should convert ArticleEntity to Article interface", () => {
    const entity = getArticleEntity();
    const article = getMockArticles()[0];
    article.reports.push(getMockReports()[0]);
    expect(convertArticleEntityToInterface(entity)).toEqual(article);
  });
});
