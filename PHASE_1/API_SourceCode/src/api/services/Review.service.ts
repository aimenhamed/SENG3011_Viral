import { getLogger } from "../../utils/Logger";
import {
  IReviewDeleteRequestBody,
  IReviewPostRequestBody,
  IReviewPostSuccessResponse,
  IReviewUpvoteRequestBody,
  IReviewUpvoteSuccessResponse,
  IReviewDeleteSuccessResponse,
} from "IApiResponses";
import { ReviewRepository } from "../../repositories/Review.repository";
import { CountryRepository } from "../../repositories/Country.repository";
import { UserRepository } from "../../repositories/User.respository";
import { ReviewEntity } from "../../entity/Review.entity";
import { CountryEntity } from "../../entity/Country.entity";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import {
  badRequest,
  internalServerError,
  notFoundError,
} from "../../utils/Constants";
import {
  convertReviewEntityToInterface,
  convertReviewEntityToSimpleInterface,
} from "../../converters/Review.converter";
import { getLog } from "../../utils/Helpers";
import { convertUserEntityToInterface } from "../../converters/User.converter";

export class ReviewService {
  private logger = getLogger();
  constructor(
    readonly reviewRepository: ReviewRepository,
    readonly countryRepository: CountryRepository,
    readonly userRepository: UserRepository
  ) {}

  async createReview(
    reviewDetails: IReviewPostRequestBody
  ): Promise<IReviewPostSuccessResponse | undefined> {
    const user = await this.getUser(reviewDetails.userId);
    const country = await this.getCountry(reviewDetails.countryId);
    this.logger.info("arrived here");
    const newReview = new ReviewEntity();
    newReview.createdBy = user;
    newReview.country = country;
    newReview.rating = reviewDetails.rating;
    newReview.title = reviewDetails.title;
    newReview.mainText = reviewDetails.mainText;
    newReview.date = new Date();
    console.log(newReview);
    const reviewEntity: ReviewEntity = await this.reviewRepository.saveReview(
      newReview
    );
    if (reviewEntity === undefined) {
      this.logger.error(
        `Failed to post review by ${reviewDetails.userId} and in country ${reviewDetails.countryId}`
      );
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully posted new review, with reviewId: ${reviewEntity.reviewId}`
    );

    return {
      review: convertReviewEntityToInterface(reviewEntity),
      log: getLog(new Date()),
    };
  }

  async getUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.getUser(userId);

    if (user === undefined) {
      this.logger.error(`Failed to find user with userId ${userId}`);
      throw new HTTPError(badRequest);
    }

    return user;
  }

  async getCountry(countryId: string): Promise<CountryEntity> {
    const country = await this.countryRepository.getCountry(countryId);

    if (country === undefined) {
      this.logger.error(`Failed to find country with countryId ${countryId}`);
      throw new HTTPError(badRequest);
    }

    return country;
  }

  async getReview(reviewId: string): Promise<ReviewEntity> {
    const review = await this.reviewRepository.getReview(reviewId);

    if (review === undefined) {
      this.logger.error(`Failed to find review with reviewId ${reviewId}`);
      throw new HTTPError(notFoundError);
    }

    return review;
  }

  async upvoteReview(
    reviewDetails: IReviewUpvoteRequestBody
  ): Promise<IReviewUpvoteSuccessResponse | undefined> {
    const user = await this.getUser(reviewDetails.userId);
    let upvotedReview = await this.getReview(reviewDetails.reviewId);
    const status = reviewDetails.status;

    upvotedReview.upvotedBy = upvotedReview.upvotedBy.filter(
      (a) => a.userId !== user.userId
    );

    if (status) {
      upvotedReview.upvotedBy = [...upvotedReview.upvotedBy, user];
    }

    console.log(upvotedReview);
    upvotedReview = await this.reviewRepository.saveReview(upvotedReview);
    console.log("check2\n");
    if (upvotedReview === undefined) {
      console.log("check3\n");
      this.logger.info(
        `Failed to change status for user ${user} on review ${upvotedReview}`
      );
      throw new HTTPError(internalServerError);
    }

    console.log(user);
    console.log(upvotedReview);
    return {
      user: convertUserEntityToInterface(user),
      review: convertReviewEntityToInterface(upvotedReview),
      log: getLog(new Date()),
    };
  }

  async deleteReview(
    reviewDetails: IReviewDeleteRequestBody
  ): Promise<IReviewDeleteSuccessResponse | undefined> {
    const user = await this.getUser(reviewDetails.userId);
    const review = await this.getReview(reviewDetails.reviewId);

    if (user.userId != review.createdBy.userId) {
      this.logger.info(`User does not have permissions to delete this review`);
      throw new HTTPError(badRequest);
    }

    if (!review) {
      this.logger.info(
        `Failed to delete review ${review} as it does not exist`
      );
      throw new HTTPError(badRequest);
    }

    await this.reviewRepository.deleteReview(review);

    return {
      log: getLog(new Date()),
    };
  }
}
