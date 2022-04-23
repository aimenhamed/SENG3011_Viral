import { CommentService } from "./Comment.service";
import { CommentRepository } from "../../repositories/Comment.repository";
import { UserRepository } from "../../repositories/User.respository";
import { CountryRepository } from "../../repositories/Country.repository";
import {
  getMockCountries,
  getMockUsers,
  getUserEntity,
} from "../../utils/testData";
import {
  baseLog,
  badRequest,
  internalServerError,
} from "../../utils/Constants";
import { HTTPError } from "../../utils/Errors";

describe("CommentService", () => {
  let commentRepository: CommentRepository;
  let countryRepository: CountryRepository;
  let userRepository: UserRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    commentRepository = new CommentRepository();
    countryRepository = new CountryRepository();
    userRepository = new UserRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const commentService = () =>
    new CommentService(commentRepository, countryRepository, userRepository);

  describe("postComment", () => {
    it("should resolve and return a comment object", () => {
      const service = commentService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      commentRepository.saveComment = jest.fn().mockReturnValue({
        commentId: "comment 1",
        createdBy: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        country,
        message: "test string",
        date: "2022-04-23T10:08:53.014Z",
      });
      expect(
        service.createComment({
          userId: user.userId,
          countryId: country.countryId,
          message: "test string",
        })
      ).resolves.toEqual({
        comment: {
          commentId: "comment 1",
          country: {
            advice: {
              adviceId: "advice1",
              adviceLevel: "Do not Travel",
              continent: "North America",
              lastUpdate: expect.any(Date),
              latestAdvice: "abababababa",
              url: "https://www.idkwherethisgoes.com",
            },
            code: "US",
            comments: [],
            coords: [30, 30],
            countryId: "country1",
            name: "United States of America",
            reviews: [],
          },
          createdBy: {
            email: "jeff1@gmail.com",
            name: "jeff",
            userId: "user-123",
          },
          date: "2022-04-23T10:08:53.014Z",
          message: "test string",
        },
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw 400 error if user is not found", () => {
      const service = commentService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      userRepository.getUser = jest.fn().mockReturnValue(undefined);
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      commentRepository.saveComment = jest.fn().mockReturnValue({
        commentId: "comment 1",
        createdBy: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        country,
        message: "test string",
        date: "2022-04-23T10:08:53.014Z",
      });

      const errorResult = new HTTPError(badRequest);

      expect(
        service.createComment({
          userId: "bad id",
          countryId: country.countryId,
          message: "test string",
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw 400 error if country is not found", () => {
      const service = commentService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      countryRepository.getCountry = jest.fn().mockReturnValue(undefined);
      commentRepository.saveComment = jest.fn().mockReturnValue({
        commentId: "comment 1",
        createdBy: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        country,
        message: "test string",
        date: "2022-04-23T10:08:53.014Z",
      });

      const errorResult = new HTTPError(badRequest);

      expect(
        service.createComment({
          userId: user.userId,
          countryId: "bad id",
          message: "test string",
        })
      ).rejects.toThrow(errorResult);
    });

    it("should throw 500 error if review could not be saved", () => {
      const service = commentService();
      const user = getMockUsers()[0];
      const country = getMockCountries()[0];
      userRepository.getUser = jest.fn().mockReturnValue(user);
      countryRepository.getCountry = jest.fn().mockReturnValue(country);
      commentRepository.saveComment = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);

      expect(
        service.createComment({
          userId: user.userId,
          countryId: "bad id",
          message: "test string",
        })
      ).rejects.toThrow(errorResult);
    });
  });
});
