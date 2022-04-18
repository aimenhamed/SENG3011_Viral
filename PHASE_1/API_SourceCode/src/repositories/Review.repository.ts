import { ReviewEntity } from "../entity/Review.entity";
import { getRepository } from "typeorm";

export class ReviewRepository {
  async saveReview(newReview: ReviewEntity): Promise<ReviewEntity> {
    return await getRepository(ReviewEntity).save(newReview);
  }

  async getReview(reviewId: string): Promise<ReviewEntity | undefined> {
    return await getRepository(ReviewEntity)
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.createdBy", "user")
      .leftJoinAndSelect("review.country", "country")
      .leftJoinAndSelect("review.upvotedBy", "user2")
      .where("review.reviewId = :reviewId", { reviewId })
      .getOne();

    //return await getRepository(ReviewEntity).findOne({ reviewId });
  }

  async deleteReview(review: ReviewEntity): Promise<any> {
    return await getRepository(ReviewEntity).remove(review);
  }
}
