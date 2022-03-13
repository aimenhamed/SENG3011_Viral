import { ReportEntity } from "../entity/Report.entity";
import { getRepository } from "typeorm";
import { IPeriodOfInterest } from "IApiResponses";

export class ReportRepository {
  async findReports(
    targetLocations: string[],
    keyTerms: string[],
    periodOfInterest: IPeriodOfInterest
  ): Promise<ReportEntity[]> {
    const reports = await getRepository(ReportEntity)
      .createQueryBuilder("report")
      .where(
        "report.locations @> :targetLocations AND (report.diseases && :keyTerms OR report.syndromes && :keyTerms) ",
        { targetLocations, keyTerms }
      )
      .andWhere(
        ":start_date <= report.event_date AND report.event_date <= :end_date",
        { start_date: periodOfInterest.start, end_date: periodOfInterest.end }
      )
      .orderBy("report.event_date", "DESC")
      .getMany();

    return reports;
  }

  async getAllReports(): Promise<ReportEntity[]> {
    return await getRepository(ReportEntity).find();
  }

  async getSpecificReport(reportId: string): Promise<ReportEntity> {
    const report: ReportEntity = (await getRepository(ReportEntity)
      .createQueryBuilder("report")
      .where("report.report_id::text = :reportId", { reportId })
      //.where("report.report_id::text = :reportId", { reportId: "1c86d233-9cc8-469b-83da-c9e78ba8d2f6"})
      .getOne()) as ReportEntity;

    console.log(report);

    return report;
  }

  async getReport(reportId: string): Promise<ReportEntity | undefined> {
    return await getRepository(ReportEntity).findOne({
      where: {
        reportId,
      },
    });
  }
}
