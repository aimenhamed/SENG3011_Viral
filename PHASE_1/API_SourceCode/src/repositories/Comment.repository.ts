import { CommentEntity } from "../entity/Comment.entity";
import { getRepository } from "typeorm";

export class CommentRepository {
  async saveComment(newComment: CommentEntity): Promise<CommentEntity> {
    return await getRepository(CommentEntity).save(newComment);
  }
}
