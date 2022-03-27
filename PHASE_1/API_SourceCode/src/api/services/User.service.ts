import { getLogger } from "../../utils/Logger";
import {
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
  IUserLoginRequestBody,
  IUserLoginSuccessResponse,
  IUserSpecificSuccessResponse,
  IUserRemoveBookmarkSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleRepository } from "../../repositories/Article.repository";
import { UserEntity } from "../../entity/User.entity";
import { ArticleEntity } from "../../entity/Article.entity";
import { HTTPError } from "../../utils/Errors";
import {
  internalServerError,
  badRequest,
  notFoundError,
} from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { getLog } from "../../utils/Helpers";

export class UserService {
  private logger = getLogger();
  constructor(
    readonly userRepository: UserRepository,
    readonly articleRepository: ArticleRepository,
  ) {}

  async registerUser(
    userDetails: IUserRegisterRequestBody
  ): Promise<IUserRegisterSuccessResponse | undefined> {
    const userCheck = await this.userRepository.getUserByEmail(
      userDetails.email
    );

    if (userCheck) {
      this.logger.error(
        `Failed to register user with email ${userDetails.email}, as an account already exists with this email.`
      );
      throw new HTTPError(badRequest);
    }

    const newUser = new UserEntity();
    newUser.name = userDetails.name;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;
    newUser.bookmarkedArticles = [];
    newUser.bookmarkedCountries = [];

    const userEntity: UserEntity = await this.userRepository.saveUser(newUser);
    if (userEntity === undefined) {
      this.logger.error(
        `Failed to register user with name ${newUser.name} and email ${newUser.email} `
      );
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully registered new user, with userId: ${newUser.userId}`
    );
    return {
      user: convertUserEntityToInterface(userEntity),
      log: getLog(new Date()),
    };
  }

  async bookmarkArticle(
    bookmarkDetails: IUserBookmarkArticleRequestBody
  ): Promise<IUserBookmarkArticleSuccessResponse | undefined> {
    let user = await this.getUser(bookmarkDetails.userId);
    const bookmarkedArticle = await this.getArticle(bookmarkDetails.articleId);

    if (
      user.bookmarkedArticles &&
      user.bookmarkedArticles.includes(bookmarkedArticle)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has already bookmarked article with articleId ${bookmarkedArticle.articleId}`
      );
      throw new HTTPError(badRequest);
    }
    user.bookmarkedArticles = [
      ...user.bookmarkedArticles,
      bookmarkedArticle,
    ];

    user = await this.userRepository.saveUser(user);

    return {
      user: convertUserEntityToInterface(user),
      article: convertArticleEntityToInterface(bookmarkedArticle),
      log: getLog(new Date()),
    };
  }

  async removeBookmark(
    bookmarkDetails: IUserBookmarkArticleRequestBody
  ): Promise<IUserRemoveBookmarkSuccessResponse | undefined> {
    let user = await this.getUser(bookmarkDetails.userId);
    const bookmarkedArticle = await this.getArticle(bookmarkDetails.articleId);
    if (
      !user.bookmarkedArticles ||
      user.bookmarkedArticles.length === 0 ||
      !user.bookmarkedArticles.includes(bookmarkedArticle)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has not bookmarked article with articleId ${bookmarkDetails.articleId}`
      );
      throw new HTTPError(badRequest);
    }

    user.bookmarkedArticles = user.bookmarkedArticles.filter(
      (e) => e !== bookmarkedArticle
    );

    user = await this.userRepository.saveUser(user);

    if (user === undefined) {
      this.logger.error(
        `Failed to remove bookmarked article ${bookmarkDetails.articleId} from user ${bookmarkDetails.userId}`
      );
      throw new HTTPError(internalServerError);
    }

    return {
      user: convertUserEntityToInterface(user),
      log: getLog(new Date()),
    };
  }

  async getSpecificUser(userId: string): Promise<IUserSpecificSuccessResponse> {
    const user = await this.userRepository.getUser(userId);
    if (user === undefined) {
      this.logger.error(`No user with userId ${userId} found in db`);
      throw new HTTPError(notFoundError);
    }

    this.logger.info(`User found with userId ${userId}, responding to client`);
    return {
      user: convertUserEntityToInterface(user),
      log: getLog(new Date()),
    };
  }

  async loginUser(
    userDetails: IUserLoginRequestBody
  ): Promise<IUserLoginSuccessResponse | undefined> {
    const user = await this.userRepository.getUserByEmail(userDetails.email);

    if (user === undefined) {
      this.logger.error(
        `Failed to login user with email ${userDetails.email} as no user exists with this email`
      );
      throw new HTTPError(badRequest);
    }

    if (user.password != userDetails.password) {
      this.logger.error(
        `Failed to login user with email ${userDetails.email} as they entered an incorrect password`
      );
      throw new HTTPError(badRequest);
    }

    this.logger.info(`Successfully logged in user ${user.name}`);
    return {
      user: convertUserEntityToInterface(user),
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

  async getArticle(articleId: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.getArticle(articleId);

    if (article === undefined) {
      this.logger.error(`Failed to find article with articleId ${articleId}`);
      throw new HTTPError(badRequest);
    }

    return article;
  }
}
