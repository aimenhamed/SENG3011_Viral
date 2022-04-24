import { convertReviewEntityToInterface } from "../../converters/Review.converter";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { CountryRepository } from "../../repositories/Country.repository";
import { ReviewRepository } from "../../repositories/Review.repository";
import { UserRepository } from "../../repositories/User.respository";
import {
  badRequest,
  baseLog,
  internalServerError,
  notFoundError,
} from "../../utils/Constants";
import { HTTPError } from "../../utils/Errors";
import {
  getMockCountries,
  getMockReviews,
  getMockUsers,
  getUserEntity,
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

  describe("upvoteReview", () => {
    it("upvoting own review should resolve and return a successful upvote", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);
      const status = true;

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status,
        })
      ).resolves.toEqual({
        review: convertReviewEntityToInterface(updatedReview),
        user,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("upvoting another review should resolve and return a successful upvote", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[1];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);
      const status = true;

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status,
        })
      ).resolves.toEqual({
        review: convertReviewEntityToInterface(updatedReview),
        user,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("upvoting another review twice should resolve and return a successful upvote", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[1];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);
      const status = true;

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status,
        })
      ).resolves.toEqual({
        review: convertReviewEntityToInterface(updatedReview),
        user,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status,
        })
      ).resolves.toEqual({
        review: convertReviewEntityToInterface(updatedReview),
        user,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("throw 400 error if user does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);
      const status = true;

      const errorResult = new HTTPError(badRequest);

      expect(
        service.upvoteReview({
          userId: "unknown id",
          reviewId: review.reviewId,
          status,
        })
      ).rejects.toThrow(errorResult);
    });

    it("throw 404 error if review does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(undefined);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(updatedReview);
      const status = true;

      const errorResult = new HTTPError(notFoundError);

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: "unknown id",
          status,
        })
      ).rejects.toThrow(errorResult);
    });

    it("throw 500 error if review fails to save", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);

      const updatedReview = {
        ...review,
        upvotedBy: [
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        ],
      };
      reviewRepository.saveReview = jest.fn().mockReturnValue(undefined);
      const status = true;

      const errorResult = new HTTPError(internalServerError);

      expect(
        service.upvoteReview({
          userId: user.userId,
          reviewId: review.reviewId,
          status,
        })
      ).rejects.toThrow(errorResult);
    });
  });

  describe("deleteReview", () => {
    it("should resolve and return nothing if successfully deleted", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);
      reviewRepository.deleteReview = jest.fn().mockReturnValue(review);

      expect(
        service.deleteReview({
          userId: user.userId,
          reviewId: review.reviewId,
        })
      ).resolves.toEqual({
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw a 400 error if the user is not the creator", () => {
      const service = reviewService();
      const user = getMockUsers()[1];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);
      reviewRepository.deleteReview = jest.fn().mockReturnValue(review);

      const errorResult = new HTTPError(badRequest);

      expect(
        service.deleteReview({
          userId: user.userId,
          reviewId: review.reviewId,
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw a 400 error if the user does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      reviewRepository.getReview = jest.fn().mockReturnValue(review);
      reviewRepository.deleteReview = jest.fn().mockReturnValue(review);

      const errorResult = new HTTPError(badRequest);

      expect(
        service.deleteReview({
          userId: "unknown id",
          reviewId: review.reviewId,
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw a 404 error if the review does not exist", () => {
      const service = reviewService();
      const user = getMockUsers()[0];
      const review = getMockReviews()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      reviewRepository.getReview = jest.fn().mockReturnValue(undefined);
      reviewRepository.deleteReview = jest.fn().mockReturnValue(review);

      const errorResult = new HTTPError(notFoundError);

      expect(
        service.deleteReview({
          userId: user.userId,
          reviewId: "unknown id",
        })
      ).rejects.toThrow(errorResult);
    });
  });
});
