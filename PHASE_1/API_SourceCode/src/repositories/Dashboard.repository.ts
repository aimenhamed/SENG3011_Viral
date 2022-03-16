import { DashboardEntity } from "../entity/Dashboard.entity";
import { getRepository } from "typeorm";

export class DashboardRepository {
  async saveDashboard(newDashboard: DashboardEntity): Promise<DashboardEntity> {
    return await getRepository(DashboardEntity).save(newDashboard);
  }
}
