import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { ReportRepository } from "../../repositories/Report.repository";
import { ReportService } from "./Report.service";
import { getMockReports } from "../../utils/testData";

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

  describe("getSpecificReport", () => {
    it("should throw HTTP 404 error if the report is not found", () => {
      const service = reportService();
      repository.getSpecificReport = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(notFoundError);
      getMockReports();
      expect(service.getSpecificReport("rep-abc")).rejects.toThrow(errorResult);
    });

    it("should resolve and return expected report", () => {
      const service = reportService();
      const report = getMockReports()[0];
      repository.getSpecificReport = jest.fn().mockReturnValue(report);

      expect(service.getSpecificReport("rep-123")).resolves.toEqual({
        report,
      });
    });
  });
});
