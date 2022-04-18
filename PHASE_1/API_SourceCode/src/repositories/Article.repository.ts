import { ArticleEntity } from "../entity/Article.entity";
import { getRepository } from "typeorm";

export class ArticleRepository {
  async getAllArticles(): Promise<ArticleEntity[]> {
    return await getRepository(ArticleEntity).find({
      relations: ["reports"],
      select: ["articleId", "url", "dateOfPublication", "headline"],
    });
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

  async getSpecificArticle(
    articleId: string
  ): Promise<ArticleEntity | undefined> {
    const article = await getRepository(ArticleEntity)
      .createQueryBuilder("article")
      .where("article.article_id::text = :articleId", { articleId })
      .getOne();

    return article;
  }
}
