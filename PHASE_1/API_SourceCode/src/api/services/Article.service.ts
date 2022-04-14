import { getLogger } from "../../utils/Logger";
import {
  IArticlesDumpSuccessResponse,
  IArticleSpecificSuccessResponse,
} from "IApiResponses";
import { ArticleRepository } from "../../repositories/Article.repository";
import { ArticleEntity } from "../../entity/Article.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { getLog } from "../../utils/Helpers";

export class ArticleService {
  private logger = getLogger();
  constructor(readonly articleRepository: ArticleRepository) {}

  async getAllArticles(): Promise<IArticlesDumpSuccessResponse | undefined> {
    const articles: ArticleEntity[] =
      await this.articleRepository.getAllArticles();

    if (articles.length === 0) {
      this.logger.error(`No articles found in db`);
      throw new HTTPError(internalServerError);
    }
    this.logger.info(`Articles found, responding to client`);

    return {
      articles: articles.map(convertArticleEntityToInterface),
      log: getLog(new Date()),
    };
  }

  async getSpecificArticle(
    articleId: string
  ): Promise<IArticleSpecificSuccessResponse> {
    const article = await this.articleRepository.getArticle(articleId);

    if (article === undefined) {
      this.logger.error(`No article with articleId ${articleId} found in db`);
      throw new HTTPError(notFoundError);
    }

    this.logger.info(
      `Article found with articleId ${articleId}, responding to client`
    );
    return {
      article: convertArticleEntityToInterface(article),
      log: getLog(new Date()),
    };
  }
}
