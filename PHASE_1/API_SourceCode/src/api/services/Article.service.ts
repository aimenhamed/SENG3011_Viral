import { getLogger } from "../../utils/Logger";
import {
  IArticlesDumpSuccessResponse,
  IArticleSpecificSuccessResponse,
} from "IApiResponses";
import { ArticleRepository } from "../../repositories/Article.repository";
import { ArticleEntity } from "../../entity/Article.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";

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
    const result = {
      articles,
    };
    return result;
  }

  async getSpecificArticle(
    articleId: string
  ): Promise<IArticleSpecificSuccessResponse> {
    const article: ArticleEntity =
      await this.articleRepository.getSpecificArticle(articleId);

    if (article === undefined) {
      this.logger.error(`No article found in db`);
      throw new HTTPError(notFoundError);
    }

    this.logger.info(`Article found, responding to client`);
    const result = {
      article,
    };
    return result;
  }
}
