import { getLogger } from "../../utils/Logger";
import { IArticlesDumpSuccessResponse } from "IApiResponses";
import { ArticleRepository } from "../../repositories/Article.repository";
import { ArticleEntity } from "../../entity/Article.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";

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
}
