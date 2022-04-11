import { ReviewEntity } from "../entity/Review.entity";
import { getRepository } from "typeorm";

export class ReviewRepository {
  async saveReview(newReview: ReviewEntity): Promise<ReviewEntity> {
    return await getRepository(ReviewEntity).save(newReview);
  }
}
