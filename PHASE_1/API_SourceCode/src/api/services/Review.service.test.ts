import { CountryRepository } from "../../repositories/Country.repository";
import { ReviewRepository } from "../../repositories/Review.repository";
import { UserRepository } from "../../repositories/User.respository";
import {
  badRequest,
  baseLog,
  internalServerError,
} from "../../utils/Constants";
import { HTTPError } from "../../utils/Errors";
import {
  getMockCountries,
  getMockReviews,
  getMockUsers,
} from "../../utils/testData";
import { ReviewService } from "./Review.service";

describe("Review service", () => {
  let reviewRepository: ReviewRepository;
  let countryRepository: CountryRepository;
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    reviewRepository = new ReviewRepository();
    countryRepository = new CountryRepository();
    userRepository = new UserRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const reviewService = () =>
    new ReviewService(reviewRepository, countryRepository, userRepository);

  describe("createReview", () => {
    it("should resolve and post a review", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      const review = getMockReviews()[1];
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.saveReview = jest.fn().mockReturnValue(review);

      expect(
        service.createReview({
          userId: user.userId,
          countryId: country.countryId,
          rating: review.rating,
          title: review.title,
          mainText: review.mainText,
        })
      ).resolves.toEqual({
        review: {
          ...review,
          country: {
            code: country.code,
            coords: country.coords,
            countryId: country.countryId,
            name: country.name,
          },
          createdBy: {
            email: user.email,
            name: user.name,
            userId: user.userId,
          },
        },
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw 400 error if user does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      const review = getMockReviews()[1];
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      reviewRepository.saveReview = jest.fn().mockReturnValue(review);

      const errorResult = new HTTPError(badRequest);

      expect(
        service.createReview({
          userId: "non-existent-id",
          countryId: country.countryId,
          rating: review.rating,
          title: review.title,
          mainText: review.mainText,
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw 400 error if country does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      const review = getMockReviews()[1];
      countryRepository.getCountry = jest.fn().mockReturnValue(undefined);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.saveReview = jest.fn().mockReturnValue(review);

      const errorResult = new HTTPError(badRequest);

      expect(
        service.createReview({
          userId: user.userId,
          countryId: "non-existent-id",
          rating: review.rating,
          title: review.title,
          mainText: review.mainText,
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw 500 error if review failed to save", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      const review = getMockReviews()[1];
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.saveReview = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);

      expect(
        service.createReview({
          userId: user.userId,
          countryId: "non-existent-id",
          rating: review.rating,
          title: review.title,
          mainText: review.mainText,
        })
      ).rejects.toThrow(errorResult);
    });
  });
});
