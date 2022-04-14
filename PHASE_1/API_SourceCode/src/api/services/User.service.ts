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
  IUserBookmarkCountryRequestBody,
  IUserBookmarkCountrySuccessResponse,
  IUserUpdateRequestBody,
  IUserUpdateSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleRepository } from "../../repositories/Article.repository";
import { CountryRepository } from "../../repositories/Country.repository";
import { UserEntity } from "../../entity/User.entity";
import { ArticleEntity } from "../../entity/Article.entity";
import { CountryEntity } from "../../entity/Country.entity";
import { HTTPError } from "../../utils/Errors";
import {
  internalServerError,
  badRequest,
  notFoundError,
  secret,
  jwt,
} from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { convertCountryEntityToInterface } from "../../converters/Country.converter";
import { getLog } from "../../utils/Helpers";

export class UserService {
  private logger = getLogger();
  constructor(
    readonly userRepository: UserRepository,
    readonly articleRepository: ArticleRepository,
    readonly countryRepository: CountryRepository
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
      token: jwt.sign(userEntity.userId, secret),
      user: convertUserEntityToInterface(userEntity),
      log: getLog(new Date()),
    };
  }

  async bookmarkArticle(
    bookmarkDetails: IUserBookmarkArticleRequestBody
  ): Promise<IUserBookmarkArticleSuccessResponse | undefined> {
    let user = await this.getUser(bookmarkDetails.userId);
    const bookmarkedArticle = await this.getArticle(bookmarkDetails.articleId);
    const status = bookmarkDetails.status;

    user.bookmarkedArticles = user.bookmarkedArticles.filter(
      (a) => a.articleId !== bookmarkedArticle.articleId
    );
    if (status) {
      user.bookmarkedArticles = [...user.bookmarkedArticles, bookmarkedArticle];
    }
    user = await this.userRepository.saveUser(user);
    if (user === undefined) {
      this.logger.info(
        `Failed to change status for article ${bookmarkDetails.articleId} in user ${bookmarkDetails.userId} to ${bookmarkDetails.status}`
      );
      throw new HTTPError(internalServerError);
    }
    return {
      user: convertUserEntityToInterface(user),
      article: convertArticleEntityToInterface(bookmarkedArticle),
      log: getLog(new Date()),
    };
  }

  async bookmarkCountry(
    bookmarkDetails: IUserBookmarkCountryRequestBody
  ): Promise<IUserBookmarkCountrySuccessResponse | undefined> {
    let user = await this.getUser(bookmarkDetails.userId);
    const country = await this.getCountry(bookmarkDetails.countryId);
    const status = bookmarkDetails.status;

    user.bookmarkedCountries = user.bookmarkedCountries.filter(
      (c) => c.countryId !== country.countryId
    );
    if (status) {
      user.bookmarkedCountries = [...user.bookmarkedCountries, country];
    }

    user = await this.userRepository.saveUser(user);
    this.logger.info(
      `Successfully changed bookmarked status for country ${country.code} for user ${user.userId}`
    );
    return {
      user: convertUserEntityToInterface(user),
      country: convertCountryEntityToInterface(country),
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
      token: jwt.sign(user.userId, secret),
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

  async getCountry(countryId: string): Promise<CountryEntity> {
    const country = await this.countryRepository.getCountry(countryId);

    if (country === undefined) {
      this.logger.error(`Failed to find country with countryId ${country}`);
      throw new HTTPError(badRequest);
    }

    return country;
  }

  async updateUser(
    userId: string,
    userDetails: IUserUpdateRequestBody
  ): Promise<IUserUpdateSuccessResponse | undefined> {
    let user = await this.userRepository.getUser(userId);
    if (user === undefined) {
      this.logger.error(`Failed to find user with userId ${userId}`);
      throw new HTTPError(badRequest);
    }

    user.name = userDetails.name ? userDetails.name : user.name;
    user.password = userDetails.password ? userDetails.password : user.password;

    user = await this.userRepository.saveUser(user);

    return {
      user: convertUserEntityToInterface(user),
      log: getLog(new Date()),
    };
  }
}
