import { getLogger } from "../../utils/Logger";
import { ISearchRequestHeaders, ISearchSuccessResponse } from "IApiResponses";
import { ArticleRepository } from "../../repositories/Article.repository";
import { ReportRepository } from "../../repositories/Report.repository";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { ArticleEntity } from "../../entity/Article.entity";
import { ReportEntity } from "../../entity/Report.entity";

export class SearchService {
  private logger = getLogger();
  constructor(
    readonly reportRepository: ReportRepository,
    readonly articleRepository: ArticleRepository
  ) {}

  async getSearch(
    searchCriteria: ISearchRequestHeaders
  ): Promise<ISearchSuccessResponse | undefined> {
    const reports: ReportEntity[] = await this.reportRepository.findReports(
      [searchCriteria.location],
      searchCriteria.keyTerms,
      searchCriteria.periodOfInterest
    );

    const articleIds = reports.map((report) => report.articleId);

    const articleEntities: ArticleEntity[] =
      await this.articleRepository.getArticlesById(articleIds);
    // console.log(articleEntities);

    articleEntities.forEach((entity) => {
      entity.reports = [];
      reports.forEach((report) => {
        if (report.articleId === entity.articleId) {
          entity.reports.push(report);
        }
      });
    });

    return {
      articles: articleEntities.map((article) =>
        convertArticleEntityToInterface(article)
      ),
    };
  }
}
