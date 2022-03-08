import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
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
});
