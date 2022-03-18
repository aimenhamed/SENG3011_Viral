import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { DashboardService } from "../services/Dashboard.service";
import validationMiddleware from "../middlewares/validation";
import { CommonDashboardSchema } from "../schemas/Dashboard.schema";
import { ICommonDashboardRequestBody } from "IApiResponses";
import { inspect } from "util";

export class DashboardRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly dashboardService: DashboardService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
        "/dashboards",
        validationMiddleware(CommonDashboardSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(
            `Received POST /dashboards request with body ${inspect(req.body)}`
          );
          const dashboardDetails = req.body as ICommonDashboardRequestBody;
          try {
            const result = await this.dashboardService.createDashboard(
              dashboardDetails
            );
            this.logger.info(`Responding to client in POST /dashboards`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST dashboard ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .put(
        "/dashboards/:dashboardId",
        validationMiddleware(CommonDashboardSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(
            `Received PUT /dashboards request with body ${inspect(req.body)}`
          );
          const dashboardDetails = req.body as ICommonDashboardRequestBody;
          const { dashboardId } = req.params;
          try {
            const result = await this.dashboardService.updateDashboard(
              dashboardId,
              dashboardDetails
            );
            this.logger.info(`Responding to client in PUT /dashboards`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT dashboard ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .delete(
        "/dashboards/:dashboardId",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(
            `Received DELETE /dashboards request with for dashboardId ${req.params.dashboardId}`
          );
          const { dashboardId } = req.params;
          try {
            const result = await this.dashboardService.deleteDashboard(
              dashboardId
            );
            this.logger.info(`Responding to client in DELETE /dashboards`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE dashboard ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/dashboards/:dashboardId",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.info(
            `Received GET /dashboards request with for dashboardId ${req.params.dashboardId}`
          );
          const { dashboardId } = req.params;
          try {
            const result = await this.dashboardService.getDashboard(
              dashboardId
            );
            this.logger.info(`Responding to client in GET /dashboards`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET dashboard ${formatError(
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
