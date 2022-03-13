import { getLogger } from "../../utils/Logger";
import { IReportsDumpSuccessResponse } from "IApiResponses";
import { IReportSpecificSuccessResponse } from "IApiResponses";
import { ReportRepository } from "../../repositories/Report.repository";
import { ReportEntity } from "../../entity/Report.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { IReportRequestHeaders } from "IApiResponses";

export class ReportService {
  private logger = getLogger();
  constructor(readonly reportRepository: ReportRepository) {}

  async getAllReports(): Promise<IReportsDumpSuccessResponse | undefined> {
    const reports: ReportEntity[] = await this.reportRepository.getAllReports();

    if (reports.length === 0) {
      this.logger.error(`No reports found in db`);
      throw new HTTPError(internalServerError);
    }

    this.logger.info(`Reports found, responding to client`);
    const result = {
      reports,
    };
    return result;
  }

  async getSpecificReport(
    reportId: string
  ): Promise<IReportSpecificSuccessResponse> {
    const report: ReportEntity = await this.reportRepository.getSpecificReport(
      reportId
    );

    if (report === undefined) {
      this.logger.error(`No report found in db`);
      throw new HTTPError({
        errorCode: 404,
        errorMessage: "Resource not found.",
      });
    }

    this.logger.info(`Report found, responding to client`);
    const result = {
      report,
    };
    return result;
  }
}
