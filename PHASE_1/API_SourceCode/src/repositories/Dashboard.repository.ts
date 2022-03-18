import { DashboardEntity } from "../entity/Dashboard.entity";
import { DeleteResult, getRepository } from "typeorm";

export class DashboardRepository {
  async getDashboard(
    dashboardId: string
  ): Promise<DashboardEntity | undefined> {
    return await getRepository(DashboardEntity).findOne({ dashboardId });
  }

  async saveDashboard(newDashboard: DashboardEntity): Promise<DashboardEntity> {
    return await getRepository(DashboardEntity).save(newDashboard);
  }

  async deleteDashboard(dashboardId: string): Promise<DeleteResult> {
    return await getRepository(DashboardEntity).delete({ dashboardId });
  }
}
