import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReportService } from "../services/Report.service";
import validationMiddleware from "../middlewares/validation";
import { ReportSchema } from "../schemas/Report.schema";
import { parseReportHeaders } from "../../utils/Helpers";
import { IReportRequestHeaders } from "IApiResponses";

export class ReportSpecificRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reportService: ReportService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().get(
      "/reports/specific",
      validationMiddleware(ReportSchema, "headers"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Received /reports/specific request`);
        const requestCriteria: IReportRequestHeaders = parseReportHeaders(
          req.headers
        );
        try {
          const result = await this.reportService.getSpecificReport(
            requestCriteria
          );
          this.logger.info(`Responding to client in GET /reports/specific`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to GET specific report ${formatError(
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