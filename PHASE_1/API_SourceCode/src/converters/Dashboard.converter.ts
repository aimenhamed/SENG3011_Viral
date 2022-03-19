import { Dashboard } from "IDashboard";
import { WidgetEntity } from "../entity/Widget.entity";
import { DashboardEntity } from "../entity/Dashboard.entity";
import { convertWidgetEntityToInterface } from "./Widget.converter";

export const convertDashboardEntityToInterface = (
  entity: DashboardEntity,
  widgetEntities: WidgetEntity[]
): Dashboard => {
  return {
    dashboardId: entity.dashboardId,
    userId: entity.userId,
    widgets: widgetEntities.map(convertWidgetEntityToInterface),
  };
};
