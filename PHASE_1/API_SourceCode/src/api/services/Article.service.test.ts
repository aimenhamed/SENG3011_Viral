import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { ArticleRepository } from "../../repositories/Article.repository";
import { ArticleService } from "./Article.service";
import { getMockArticles } from "../../utils/testData";

describe("ArticleService", () => {
  let repository: ArticleRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    repository = new ArticleRepository();
  });
  const articleService = () => new ArticleService(repository);

  describe("getAllArticles", () => {
    it("should throw HTTP 500 error if no articles in database", () => {
      const service = articleService();
      repository.getAllArticles = jest.fn().mockReturnValue([]);

      const errorResult = new HTTPError(internalServerError);
      getMockArticles();
      expect(service.getAllArticles()).rejects.toThrow(errorResult);
    });

    it("should resolve and return articles", () => {
      const service = articleService();
      const articles = getMockArticles();
      repository.getAllArticles = jest.fn().mockReturnValue(articles);

      expect(service.getAllArticles()).resolves.toEqual({
        articles,
      });
    });
  });

  describe("getSpecificArticle", () => {
    it("should throw HTTP 404 error if the article is not found", () => {
      const service = articleService();
      repository.getSpecificArticle = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(notFoundError);
      getMockArticles();
      expect(service.getSpecificArticle("art-abc")).rejects.toThrow(
        errorResult
      );
    });

    it("should resolve and return expected article", () => {
      const service = articleService();
      const article = getMockArticles()[0];
      repository.getSpecificArticle = jest.fn().mockReturnValue(article);

      expect(service.getSpecificArticle("art-123")).resolves.toEqual({
        article,
      });
    });
  });
});
