import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { UserService } from "../services/User.service";
import validationMiddleware from "../middlewares/validation";
import { UserRegisterSchema } from "../schemas/User.schema";
import { IUserRegisterRequestBody } from "IApiResponses";
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
    return Router().post(
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
    );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
