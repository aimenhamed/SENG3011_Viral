import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  badRequest,
  internalServerError,
  jwt,
  secret,
} from "../../utils/Constants";
import { ReviewRepository } from "../../repositories/Review.repository";
import { UserRepository } from "../../repositories/User.respository";
import { CountryRepository } from "../../repositories/Country.repository";
import { ReviewService } from "./Review.service";
import { getMockUsers, getMockReviews } from "../../utils/testData";
import { IUserRegisterRequestBody } from "../../interfaces/IApiResponses";

describe("ReviewServie", () => {
  let reviewRepository: ReviewRepository;
  let userRepository: UserRepository;
  let countryRepository: CountryRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    reviewRepository = new ReviewRepository();
    userRepository = new UserRepository();
    countryRepository = new CountryRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reviewService = () =>
    new ReviewService(reviewRepository, countryRepository, userRepository);

  describe("upvoteReview", () => {
    it("should resolve with 200 if review is successfully upvoted", () => {
      const service = reviewService();
      const user = getMockUsers()[2];
      const review = getMockReviews()[0];

      const updatedReview = { ...review, upvotedBy: [user] };

      reviewRepository.getReview = jest.fn().mockReturnValue(review);
      userRepository.getUser = jest.fn().mockReturnValue(user);

      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status: true,
        })
      ).resolves.toEqual({
        review: updatedReview,
        user: user,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });
  });
});
