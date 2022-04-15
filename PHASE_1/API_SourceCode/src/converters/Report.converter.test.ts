import { getReportEntity, getMockReports } from "../utils/testData";
import { convertReportEntityToInterface } from "./Report.converter";

describe("convertReportEntityToInterface", () => {
  it("should convert ReportEntity to Report interface", () => {
    const entity = getReportEntity();
    const report = getMockReports()[0];
    expect(convertReportEntityToInterface(entity)).toEqual(report);
  });
});
