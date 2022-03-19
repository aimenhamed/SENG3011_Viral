import { getLogger } from "../../utils/Logger";
import {
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
  IUserDashboardRequestBody,
  IUserDashboardSuccessResponse,
  IUserRemoveBookmarkSuccessResponse,
} from "IApiResponses";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleRepository } from "../../repositories/Article.repository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { WidgetRepository } from "../../repositories/Widget.repository";
import { UserEntity } from "../../entity/User.entity";
import { WidgetEntity } from "../../entity/Widget.entity";
import { ArticleEntity } from "../../entity/Article.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, badRequest } from "../../utils/Constants";
import { convertArticleEntityToInterface } from "../../converters/Article.converter";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { convertDashboardEntityToInterface } from "../../converters/Dashboard.converter";
import { getLog } from "../../utils/Helpers";

export class UserService {
  private logger = getLogger();
  constructor(
    readonly userRepository: UserRepository,
    readonly articleRepository: ArticleRepository,
    readonly dashboardRepository: DashboardRepository,
    readonly widgetRepository: WidgetRepository
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
    newUser.dashboards = [];

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
      user.bookmarkedArticles.includes(bookmarkedArticle.articleId)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has already bookmarked article with articleId ${bookmarkedArticle.articleId}`
      );
      throw new HTTPError(badRequest);
    }
    user.bookmarkedArticles = [...user.bookmarkedArticles, bookmarkedArticle.articleId]

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

    if (
      !user.bookmarkedArticles ||
      user.bookmarkedArticles.length === 0 ||
      !user.bookmarkedArticles.includes(bookmarkDetails.articleId)
    ) {
      this.logger.error(
        `User with userId ${user.userId} has not bookmarked article with articleId ${bookmarkDetails.articleId}`
      );
      throw new HTTPError(badRequest);
    }

    user.bookmarkedArticles = user.bookmarkedArticles.filter(
      (e) => e !== bookmarkDetails.articleId
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
    user.dashboards = [...user.dashboards, userDashboard.dashboardId]

    user = await this.userRepository.saveUser(user);
    const widgets:WidgetEntity[] = await this.widgetRepository.getWidgetById(dashboard.widgets);  
    return {
      user: convertUserEntityToInterface(user),
      dashboard: convertDashboardEntityToInterface(dashboard, widgets),
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
