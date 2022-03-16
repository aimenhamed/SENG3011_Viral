import { getLogger } from "../../utils/Logger";
import {
  IReportsDumpSuccessResponse,
  IReportSpecificSuccessResponse,
} from "IApiResponses";
import { ReportRepository } from "../../repositories/Report.repository";
import { ReportEntity } from "../../entity/Report.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { convertReportEntityToInterface } from "../../converters/Report.converter";

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

    return {
      reports: reports.map(convertReportEntityToInterface),
    };
  }

  async getSpecificReport(
    reportId: string
  ): Promise<IReportSpecificSuccessResponse> {
    const report = await this.reportRepository.getSpecificReport(reportId);

    if (report === undefined) {
      this.logger.error(`No report with id: ` + reportId + ` found in db`);
      throw new HTTPError(notFoundError);
    }

    this.logger.info(`Report found, responding to client`);
    const result = {
      report,
    };
    return result;
  }
}
