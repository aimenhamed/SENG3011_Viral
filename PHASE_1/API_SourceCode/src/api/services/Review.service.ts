import { getLogger } from "../../utils/Logger";
import {
  IReviewPostRequestBody,
  IReviewPostSuccessResponse,
} from "IApiResponses";
import { ReviewRepository } from "../../repositories/Review.repository";
import { CountryRepository } from "../../repositories/Country.repository";
import { UserRepository } from "../../repositories/User.respository";
import { ReviewEntity } from "../../entity/Review.entity";
import { CountryEntity } from "../../entity/Country.entity";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { badRequest, internalServerError } from "../../utils/Constants";
import { convertReviewEntityToInterface } from "../../converters/Review.converter";
import { getLog } from "../../utils/Helpers";

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
    newReview.reviewCreatedBy = user;
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
}
