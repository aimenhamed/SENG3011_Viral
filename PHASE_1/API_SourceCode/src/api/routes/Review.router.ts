import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import validationMiddleware from "../middlewares/validation";
import { ReviewService } from "../services/Review.service";
import {
  ReviewPostSchema,
  ReviewUpvoteSchema,
  ReviewDeleteSchema,
} from "../schemas/Review.schema";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import {
  IReviewUpvoteRequestBody,
  IReviewDeleteRequestBody,
} from "IApiResponses";

export class ReviewRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reviewService: ReviewService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
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
      )
      .put(
        "/reviews/upvote",
        validationMiddleware(ReviewUpvoteSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /review/upvote request`);

          const reviewDetails = req.body as IReviewUpvoteRequestBody;
          if (!reviewDetails) throw new HTTPError(badRequest);

          try {
            const result = await this.reviewService.upvoteReview(reviewDetails);
            console.log("check5\n");
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT upvote for user ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .delete(
        "/reviews",
        validationMiddleware(ReviewDeleteSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /reviews/delete request`);

          const reviewDetails = req.body as IReviewDeleteRequestBody;
          if (!reviewDetails) throw new HTTPError(badRequest);

          try {
            const results = await this.reviewService.deleteReview(
              reviewDetails
            );
            return res.status(200).json(results);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE review ${formatError(
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
