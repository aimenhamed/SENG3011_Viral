import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ArticleService } from "../services/Article.service";

export class ArticleRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly articleService: ArticleService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().get(
      "/articles/dump",
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Received /articles/dump request`);
        try {
          const result = await this.articleService.getAllArticles();
          this.logger.info(`Responding to client in GET /articles/dump`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to GET all articles ${formatError(
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
