import { ArticleEntity } from "../entity/Article.entity";
import { getRepository } from "typeorm";

export class ArticleRepository {
  async getAllArticles(): Promise<ArticleEntity[]> {
    return await getRepository(ArticleEntity).find();
  }

  async getArticle(articleId: string): Promise<ArticleEntity | undefined> {
    return await getRepository(ArticleEntity).findOne({
      relations: ["reports"],
      where: {
        articleId,
      },
    });
  }

  async getArticlesById(articleIds: string[]): Promise<ArticleEntity[]> {
    return await getRepository(ArticleEntity)
      .createQueryBuilder("article")
      .where("article.article_id = ANY (:articleIds)", { articleIds })
      .getMany();
  }

  async getSpecificArticle(articleId: string): Promise<ArticleEntity> {
    const article: ArticleEntity = (await getRepository(ArticleEntity)
      .createQueryBuilder("article")
      .where("article.article_id::text = :articleId", { articleId })
      .getOne()) as ArticleEntity;

    return article;
  }
}
