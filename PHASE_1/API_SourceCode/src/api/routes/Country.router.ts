import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import validationMiddleware from "../middlewares/validation";
import { CountryService } from "../services/Country.service";
import { CountryGetSchema, FlightsSchema } from "../schemas/Country.schema";

export class CountryRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly countryService: CountryService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/country",
        validationMiddleware(CountryGetSchema, "query"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received GET /country request`);
          try {
            const country: string = req.query.country as string;
            const result = await this.countryService.getCountryInfo(country);
            this.logger.info(`Responding to client in GET /country`);
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
        "/country/flights",
        validationMiddleware(FlightsSchema, "query"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(`Received GET /flights request`);
          try {
            const flightDetails = {
              originLocationCode: req.query.originLocationCode as string,
              destinationLocationCode: req.query
                .destinationLocationCode as string,
              departureDate: req.query.departureDate as string,
              adults: req.query.adults as string,
            };

            const result = await this.countryService.getFlights(flightDetails);
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
