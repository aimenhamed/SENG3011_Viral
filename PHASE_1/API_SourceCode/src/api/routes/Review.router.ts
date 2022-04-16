import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import validationMiddleware from "../middlewares/validation";
import { ReviewService } from "../services/Review.service";
import { ReviewPostSchema } from "../schemas/Review.schema";

export class ReviewRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reviewService: ReviewService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().post(
      "/reviews",
      validationMiddleware(ReviewPostSchema, "body"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Received POST /reviews request`);
        try {
          const newReview = req.body;

          const result = await this.reviewService.createReview(newReview);
          this.logger.info(`Responding to client in POST /Reviews`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to POST Review ${formatError(err)}`
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
