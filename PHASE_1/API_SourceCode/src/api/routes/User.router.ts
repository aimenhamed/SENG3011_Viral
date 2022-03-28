import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { UserService } from "../services/User.service";
import validationMiddleware from "../middlewares/validation";
import {
  UserRegisterSchema,
  UserBookmarkArticleSchema,
  UserDashboardSchema,
  UserLoginSchema,
} from "../schemas/User.schema";
import {
  IUserRegisterRequestBody,
  IUserBookmarkArticleRequestBody,
  IUserLoginRequestBody,
} from "IApiResponses";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";

export class UserRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly userService: UserService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
        "/users/register",
        validationMiddleware(UserRegisterSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /users/register request`);

          const userDetails = req.body as IUserRegisterRequestBody;
          if (!userDetails) throw new HTTPError(badRequest);

          try {
            const result = await this.userService.registerUser(userDetails);
            this.logger.info(`Responding to client in POST /users/register`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST register user ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/users/bookmark-article",
        validationMiddleware(UserBookmarkArticleSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /users/bookmark-article request`);

          const bookmarkDetails = req.body as IUserBookmarkArticleRequestBody;
          if (!bookmarkDetails) throw new HTTPError(badRequest);

          try {
            const result = await this.userService.bookmarkArticle(
              bookmarkDetails
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occured when trying to PUT bookmark article for user ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/users/:userId",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /users/:userId request`);
          try {
            const userId: string = req.params.userId;
            const result = await this.userService.getSpecificUser(userId);
            this.logger.info(`Responding to client in GET /users/:userId`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET specific user with userId ${
                req.params.userId
              }.${formatError(err)}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/users/remove-bookmark",
        validationMiddleware(UserBookmarkArticleSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /users/remove-bookmark request`);

          const bookmarkDetails = req.body as IUserBookmarkArticleRequestBody;
          if (!bookmarkDetails) throw new HTTPError(badRequest);

          try {
            const result = await this.userService.removeBookmark(
              bookmarkDetails
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occured when trying to PUT remove bookmark for user ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/users/login",
        validationMiddleware(UserLoginSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /users/login request`);

          const userDetails = req.body as IUserLoginRequestBody;
          if (!userDetails) throw new HTTPError(badRequest);

          try {
            const result = await this.userService.loginUser(userDetails);
            this.logger.info(`Responding to client in POST /users/login`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST login user ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
