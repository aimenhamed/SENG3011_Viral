import { getLogger } from "../../utils/Logger";
import {
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
  IUserDashboardRequestBody,
  IUserDashboardSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleRepository } from "../../repositories/Article.repository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, badRequest } from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { getLog } from "../../utils/Helpers";
import { convertDashboardEntityToInterface } from "../../converters/Dashboard.converter";

export class UserService {
  private logger = getLogger();
  constructor(
    readonly userRepository: UserRepository,
    readonly articleRepository: ArticleRepository,
    readonly dashboardRepository: DashboardRepository
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
    let user = await this.userRepository.getUser(bookmarkDetails.userId);

    if (user === undefined) {
      this.logger.error(
        `Failed to find user with userId ${bookmarkDetails.userId}`
      );
      throw new HTTPError(badRequest);
    }

    const bookmarkedArticle = await this.articleRepository.getArticle(
      bookmarkDetails.articleId
    );

    if (bookmarkedArticle === undefined) {
      this.logger.error(
        `Failed to find article with articleId ${bookmarkDetails.articleId}`
      );
      throw new HTTPError(badRequest);
    }

    if (
      user.bookmarkedArticles &&
      user.bookmarkedArticles.includes(bookmarkedArticle.articleId)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has already bookmarked article with articleId ${bookmarkedArticle.articleId}`
      );
      throw new HTTPError(badRequest);
    }
    user.bookmarkedArticles = user.bookmarkedArticles
      ? [...user.bookmarkedArticles, bookmarkedArticle.articleId]
      : [bookmarkedArticle.articleId];

    user = await this.userRepository.saveUser(user);

    return {
      user: convertUserEntityToInterface(user),
      article: convertArticleEntityToInterface(bookmarkedArticle),
      log: getLog(new Date()),
    };
  }

  async addDashboardToUser(
    userDashboard: IUserDashboardRequestBody
  ): Promise<IUserDashboardSuccessResponse | undefined> {
    let user = await this.userRepository.getUser(userDashboard.userId);
    if (user === undefined) {
      this.logger.error(
        `Failed to find user with userId ${userDashboard.userId}`
      );
      throw new HTTPError(badRequest);
    }

    const dashboard = await this.dashboardRepository.getDashboard(
      userDashboard.dashboardId
    );

    if (dashboard === undefined) {
      this.logger.error(
        `Failed to find article with articleId ${userDashboard.dashboardId}`
      );
      throw new HTTPError(badRequest);
    }

    if (
      user.dashboards &&
      user.dashboards.includes(userDashboard.dashboardId)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has already bookmarked article with articleId ${userDashboard.dashboardId}`
      );
      throw new HTTPError(badRequest);
    }
    user.dashboards = user.dashboards
      ? [...user.dashboards, userDashboard.dashboardId]
      : [userDashboard.dashboardId];

    user = await this.userRepository.saveUser(user);

    return {
      user: convertUserEntityToInterface(user),
      dashboard: convertDashboardEntityToInterface(dashboard, []),
      log: getLog(new Date()),
    };
  }
}
