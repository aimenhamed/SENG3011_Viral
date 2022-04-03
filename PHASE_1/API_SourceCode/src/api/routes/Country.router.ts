import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import validationMiddleware from "../middlewares/validation";
import { CountryService } from "../services/Country.service";
import { CommentPostSchema } from "../schemas/Comment.schema";

export class CountryRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly countryService: CountryService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().get(
      "/country/flights",
      // validationMiddleware(FlightsGetSchema, "body"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Received GET /flights request`);
        try {
          const flightStuff = {
            originLocationCode: req.query.originLocationCode as string,
            destinationLocationCode: req.query
              .destinationLocationCode as string,
            departureDate: req.query.departureDate as string,
            adults: req.query.adults as string,
          };

          const result = await this.countryService.getFlights(flightStuff);
          this.logger.info(`Responding to client in GET /flights`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to GET flights ${formatError(err)}`
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
