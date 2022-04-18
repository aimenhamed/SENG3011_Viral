import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import validationMiddleware from "../middlewares/validation";
import { CommentService } from "../services/Comment.service";
import { CommentPostSchema } from "../schemas/Comment.schema";

export class CommentRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly commentService: CommentService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().post(
      "/comments",
      validationMiddleware(CommentPostSchema, "body"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Received POST /comments request`);
        try {
          const newComment = req.body;

          const result = await this.commentService.createComment(newComment);
          this.logger.info(`Responding to client in POST /comments`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to POST comment ${formatError(err)}`
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
