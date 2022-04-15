import { CommentEntity } from "../entity/Comment.entity";
import { getRepository } from "typeorm";
import { CountryEntity } from "../entity/Country.entity";

export class CommentRepository {
  async saveComment(newComment: CommentEntity): Promise<CommentEntity> {
    return await getRepository(CommentEntity).save(newComment);
  }

  async getCommentsByCountry(country: string): Promise<CommentEntity[]> {
    return await getRepository(CommentEntity)
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.country", "country")
      .leftJoinAndSelect("comment.createdBy", "user")
      .where("country.name = :country", { country })
      .getMany();
  }
}
