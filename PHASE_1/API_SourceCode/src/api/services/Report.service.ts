import { getLogger } from "../../utils/Logger";
import { IReportsDumpSuccessResponse } from "IApiResponses";
import { ReportRepository } from "../../repositories/Report.repository";
import { ReportEntity } from "../../entity/Report.entity";
import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";

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
}
