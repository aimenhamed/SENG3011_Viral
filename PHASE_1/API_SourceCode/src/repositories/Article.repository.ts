import { ArticleEntity } from "../entity/Article.entity";
import { getRepository } from "typeorm";

export class ArticleRepository {
  async getAllArticles(): Promise<ArticleEntity[]> {
    return await getRepository(ArticleEntity).find();
  }

  async getArticle(articleId: string): Promise<ArticleEntity | undefined> {
    return await getRepository(ArticleEntity).findOne({ articleId });
  }
}