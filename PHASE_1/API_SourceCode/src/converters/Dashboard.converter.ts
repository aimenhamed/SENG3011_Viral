import { Dashboard } from "IDashboard";
import { WidgetEntity } from "../entity/Widget.entity";
import { DashboardEntity } from "../entity/Dashboard.entity";
import { convertWidgetEntityToInterface } from "./Widget.converter";

export const convertDashboardEntityToInterface = (
  entity: DashboardEntity,
  widgetEntites: WidgetEntity[]
): Dashboard => {
  return {
    dashboardId: entity.dashboardId,
    userId: entity.userId,
    widgets: widgetEntites.map(convertWidgetEntityToInterface),
  };
};
