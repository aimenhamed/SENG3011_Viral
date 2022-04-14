import { HTTPError } from "../../utils/Errors";
import {
  badRequest,
  baseLog,
  internalServerError,
} from "../../utils/Constants";
import { ArticleRepository } from "../../repositories/Article.repository";
import { SearchService } from "./Search.service";
import { getMockArticles, getMockReports } from "../../utils/testData";
import { ReportRepository } from "../../repositories/Report.repository";
import { ISearchRequestHeaders } from "../../interfaces/IApiResponses";

describe("SearchService", () => {
  let articleRepository: ArticleRepository;
  let reportRepository: ReportRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    articleRepository = new ArticleRepository();
    reportRepository = new ReportRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const searchService = () =>
    new SearchService(reportRepository, articleRepository);

  describe("getSearch", () => {
    it("should throw HTTP 400 error if start time is after end time", () => {
      const service = searchService();
      const searchCriteria: ISearchRequestHeaders = {
        periodOfInterest: {
          start: "2021-09-24",
          end: "2009-09-23",
        },
        location: "My House",
        keyTerms: ["Me"],
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.getSearch(searchCriteria)).rejects.toThrow(errorResult);
    });

    it("should throw HTTP 500 error if failed to retrieve reports in database", () => {
      const service = searchService();
      reportRepository.findReports = jest.fn().mockReturnValue(undefined);
      const searchCriteria: ISearchRequestHeaders = {
        periodOfInterest: {
          start: "0",
          end: "0",
        },
        location: "My House",
        keyTerms: ["Me"],
      };

      const errorResult = new HTTPError(internalServerError);
      expect(service.getSearch(searchCriteria)).rejects.toThrow(errorResult);
    });

    it("should resolve and return articles", () => {
      const service = searchService();
      const reports = getMockReports();
      const articles = getMockArticles();
      const searchCriteria: ISearchRequestHeaders = {
        periodOfInterest: {
          start: "0",
          end: "0",
        },
        location: "My House",
        keyTerms: ["Me"],
      };
      reportRepository.findReports = jest.fn().mockReturnValue(reports);
      articleRepository.getArticlesById = jest.fn().mockReturnValue(articles);
      expect(service.getSearch(searchCriteria)).resolves.toEqual({
        articles,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });
  });
});
