import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { SearchService } from "../services/Search.service";
import validationMiddleware from "../middlewares/validation";
import { SearchSchema } from "../schemas/Search.schema";
import { parseHeaders } from "../../utils/Helpers";
import { ISearchRequestHeaders } from "IApiResponses";
import { inspect } from "util";

export class SearchRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly searchService: SearchService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().get(
      "/search",
      validationMiddleware(SearchSchema, "headers"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(
          `Received /search request with headers ${inspect(req.headers)}`
        );
        try {
          const searchCriteria: ISearchRequestHeaders = parseHeaders(
            req.headers
          );
          const result = await this.searchService.getSearch(searchCriteria);
          this.logger.info(`Responding to client in GET /search`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to GET search ${formatError(err)}`
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
