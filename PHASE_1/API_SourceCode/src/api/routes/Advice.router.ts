import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { CountryService } from "../services/Country.service";

export class AdviceRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly countryService: CountryService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/advice",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /advice request`);
          try {
            const country: string = req.query.country as string;
            const result = await this.countryService.getCountryInfo(country);
            this.logger.info(`Responding to client in GET /advice`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET advice ${formatError(err)}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/advice/all",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received /advice/all request`);
          try {
            const result = await this.countryService.getAllAdvice();
            this.logger.info(`Responding to client in GET /advice/all`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET advice ${formatError(err)}`
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
