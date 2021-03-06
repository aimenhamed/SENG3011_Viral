import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  badRequest,
  internalServerError,
  jwt,
  secret,
} from "../../utils/Constants";
import { ArticleRepository } from "../../repositories/Article.repository";
import { UserRepository } from "../../repositories/User.respository";
import { CountryRepository } from "../../repositories/Country.repository";
import { UserService } from "./User.service";
import { getMockArticles, getMockUsers } from "../../utils/testData";
import { IUserRegisterRequestBody } from "../../interfaces/IApiResponses";

describe("UserService", () => {
  let userRepository: UserRepository;
  let articleRepository: ArticleRepository;
  let countryRepository: CountryRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    userRepository = new UserRepository();
    articleRepository = new ArticleRepository();
    countryRepository = new CountryRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const userService = () =>
    new UserService(userRepository, articleRepository, countryRepository);

  describe("registerNewUser", () => {
    it("should resolve with 200 if the user is successfully registered", () => {
      const service = userService();
      const userRecord = getMockUsers()[2];
      const newUser: IUserRegisterRequestBody = {
        name: userRecord.name,
        email: userRecord.email,
        password: "",
      };

      userRepository.getUserByEmail = jest.fn().mockReturnValue(undefined);
      userRepository.saveUser = jest.fn().mockReturnValue(userRecord);
      expect(service.registerUser(newUser)).resolves.toEqual({
        token: jwt.sign(userRecord.userId, secret),
        user: userRecord,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw 400 error if user already exists", () => {
      const service = userService();
      const existingUser = getMockUsers()[2];
      userRepository.getUserByEmail = jest.fn().mockReturnValue(existingUser);
      const reqBody: IUserRegisterRequestBody = {
        name: existingUser.name,
        email: existingUser.email,
        password: "",
      };

      const errorResult = new HTTPError(badRequest);
      expect(service.registerUser(reqBody)).rejects.toThrow(errorResult);
    });

    it("should respond with 500 error if the user could not be added", () => {
      const service = userService();
      const userRecord = getMockUsers()[0];
      const newUser: IUserRegisterRequestBody = {
        name: userRecord.name,
        email: userRecord.email,
        password: "",
      };

      userRepository.getUserByEmail = jest.fn().mockReturnValue(undefined);
      userRepository.saveUser = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);
      expect(service.registerUser(newUser)).rejects.toThrow(errorResult);
    });
  });

  describe("bookmarkArticle", () => {
    it("should resolve with 200 if article is successfully bookmarked", () => {
      const service = userService();
      const user = getMockUsers()[2];
      const article = getMockArticles()[0];
      const updatedUser = { ...user, bookmarkedArticles: [article] };
      userRepository.getUser = jest.fn().mockReturnValue(user);
      articleRepository.getArticle = jest.fn().mockReturnValue(article);
      userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
      expect(
        service.bookmarkArticle({
          userId: user.userId,
          articleId: article.articleId,
          status: true,
        })
      ).resolves.toEqual({
        user: updatedUser,
        article: article,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should resolve with 200 if an article was successfully removed", () => {
      const service = userService();
      const user = getMockUsers()[2];
      const article = getMockArticles()[0];
      const updatedUser = { ...user, bookmarkedArticles: [article] };
      userRepository.getUser = jest.fn().mockReturnValue(user);
      articleRepository.getArticle = jest.fn().mockReturnValue(article);
      userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);

      const result = service.bookmarkArticle({
        userId: user.userId,
        articleId: article.articleId,
        status: true,
      });

      userRepository.getUser = jest.fn().mockReturnValue(updatedUser);
      userRepository.saveUser = jest.fn().mockReturnValue(user);

      expect(
        service.bookmarkArticle({
          userId: user.userId,
          articleId: article.articleId,
          status: false,
        })
      ).resolves.toEqual({
        user: user,
        article: article,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });
  });

  describe("updateUser", () => {
    it("should resolve with 200 if user is successfully updated", () => {
      const service = userService();
      const user = getMockUsers()[2];
      const newName = "newName";
      const newPassword = "newPassword";
      const updatedUser = {
        userId: user.userId,
        name: newName,
        email: user.email,
        bookmarkedArticles: user.bookmarkedArticles,
        bookmarkedCountries: user.bookmarkedCountries,
      };

      userRepository.getUser = jest.fn().mockReturnValue(user);
      userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);

      expect(
        service.updateUser(user.userId, {
          name: newName,
          password: newPassword,
        })
      ).resolves.toEqual({
        user: updatedUser,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw 400 error if user does not exist", () => {
      const service = userService();
      const newName = "newName";
      const newPassword = "newPassword";
      const userId = "nonexistent";
      userRepository.getUser = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(badRequest);
      expect(
        service.updateUser(userId, {
          name: newName,
          password: newPassword,
        })
      ).rejects.toThrow(errorResult);
    });
  });
});
