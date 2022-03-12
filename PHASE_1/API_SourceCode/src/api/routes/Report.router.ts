import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReportService } from "../services/Report.service";

export class ReportRouter implements IRouter {
    private readonly logger = getLogger();
    private readonly router: Router;
    private readonly prefix = "/api/v1";

    constructor(private readonly reportService: ReportService) {
        this.router = this.setupRoutes();
    }

    setupRoutes(): Router {
        return Router().get(
            "/reports/dump",
            async (req: Request, res: Response, next: NextFunction) => {
                this.logger.info(`Received /reports/dump request`);
                try {
                    const result = await this.reportService.getAllReports();
                    this.logger.info(`Responding to client in GET /reports/dump`);
                    return res.status(200).json(result);
                } catch (err: any) {
                    this.logger.warn(
                        `An error occurred when trying to GET all  reports ${formatError(
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