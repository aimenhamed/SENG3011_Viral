import { getLogger } from "../../utils/Logger";
import {
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleRepository } from "../../repositories/Article.repository";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, badRequest } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";

export class UserService {
  private logger = getLogger();
  constructor(readonly userRepository: UserRepository, readonly articleRepository: ArticleRepository) {}

  async registerUser(
    userDetails: IUserRegisterRequestBody
  ): Promise<IUserRegisterSuccessResponse | undefined> {
    const newUser = new UserEntity();
    newUser.name = userDetails.name;
    newUser.email = userDetails.email;
    newUser.password = userDetails.password;

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
    };
  }

  async bookmarkArticle(
    bookmarkDetails: IUserBookmarkArticleRequestBody
  ): Promise<IUserBookmarkArticleSuccessResponse | undefined> {
    let user = await this.userRepository.getUser(bookmarkDetails.userId);

    if (user === undefined) {
      this.logger.error(
        `Failed to find user with userId ${bookmarkDetails.userId}`
      );
      throw new HTTPError(badRequest);
    }

    const bookmarkedArticle = await this.articleRepository.getArticle(bookmarkDetails.articleId);

    if (bookmarkedArticle === undefined) {
      this.logger.error(
        `Failed to find article with articleId ${bookmarkDetails.articleId}`
      );
      throw new HTTPError(badRequest);
    }


    if (user.bookmarkedArticles && user.bookmarkedArticles.includes(bookmarkedArticle.articleId)) {
      this.logger.error(
        `User with userId ${user.userId} has already bookmarked article with articleId ${bookmarkedArticle.articleId}`
      );
      throw new HTTPError(badRequest);
    }
    user.bookmarkedArticles = user.bookmarkedArticles ? [...user.bookmarkedArticles, bookmarkedArticle.articleId] : [bookmarkedArticle.articleId];

    user = await this.userRepository.saveUser(user);
    
    return {
      user: convertUserEntityToInterface(user),
      article: convertArticleEntityToInterface(bookmarkedArticle),
    }
  }
}
