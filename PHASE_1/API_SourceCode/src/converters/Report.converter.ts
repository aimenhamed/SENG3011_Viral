import { Report } from "IReport";
import { ReportEntity } from "../entity/Report.entity";

export const convertReportEntityToInterface = (
  entity: ReportEntity
): Report => {
  return {
    reportId: entity.reportId,
    diseases: entity.diseases,
    syndromes: entity.syndromes,
    eventDate: entity.eventDate,
    locations: entity.locations,
  };
};
