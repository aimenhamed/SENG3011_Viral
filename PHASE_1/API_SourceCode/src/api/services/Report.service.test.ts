import { HTTPError } from "../../utils/Errors";
import { internalServerError } from "../../utils/Constants";
import { ReportRepository } from "../../repositories/Report.repository";
import { ReportService } from "./Report.service";
import { getMockReports } from "../../utils/testData";
import { IReportRequestHeaders } from "../../interfaces/IApiResponses";

describe("ReportService", () => {
  let repository: ReportRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    repository = new ReportRepository();
  });
  const reportService = () => new ReportService(repository);

  describe("getAllReports", () => {
    it("should throw HTTP 500 error if no reports in database", () => {
      const service = reportService();
      repository.getAllReports = jest.fn().mockReturnValue([]);

      const errorResult = new HTTPError(internalServerError);
      getMockReports();
      expect(service.getAllReports()).rejects.toThrow(errorResult);
    });

    it("should resolve and return articles", () => {
      const service = reportService();
      const reports = getMockReports();
      repository.getAllReports = jest.fn().mockReturnValue(reports);

      expect(service.getAllReports()).resolves.toEqual({
        reports,
      });
    });
  });
});
