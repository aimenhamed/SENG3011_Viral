import { getLogger } from "../../utils/Logger";
import {
  IPostDashboardRequestBody,
  IPostDashboardSuccessResponse,
} from "IApiResponses";
import { WidgetRepository } from "../../repositories/Widget.repository";
import { UserRepository } from "../../repositories/User.respository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { DashboardEntity } from "../../entity/Dashboard.entity";
import { WidgetEntity } from "../../entity/Widget.entity";
import { HTTPError } from "../../utils/Errors";
import { notFoundError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { convertDashboardEntityToInterface } from "../../converters/Dashboard.converter";

export class DashboardService {
  private logger = getLogger();
  constructor(
    readonly widgetRepository: WidgetRepository,
    readonly userRepository: UserRepository,
    readonly dashboardRepository: DashboardRepository
  ) {}

  async createDashboard(
    dashboardDetails: IPostDashboardRequestBody
  ): Promise<IPostDashboardSuccessResponse | undefined> {
    let user = await this.userRepository.getUser(dashboardDetails.userId);

    if (!user) {
      this.logger.error(`No user found with userId ${dashboardDetails.userId}`);
      throw new HTTPError(notFoundError);
    }

    const dashboardEntity = new DashboardEntity();
    dashboardEntity.userId = dashboardDetails.userId;
    dashboardEntity.widgets = [];
    const newDashboard = await this.dashboardRepository.saveDashboard(
      dashboardEntity
    );

    const widgetEntites: WidgetEntity[] = [];
    const { widgets } = dashboardDetails;
    for (const widget of widgets) {
      const widgetEntity = new WidgetEntity();
      widgetEntity.articleId = widget.articleId;
      widgetEntity.widgetType = widget.widgetType;
      widgetEntity.dashboardId = newDashboard.dashboardId;

      widgetEntites.push(await this.widgetRepository.saveWidget(widgetEntity));
    }

    newDashboard.widgets = widgetEntites.map((item) => item.widgetId);
    const dashboardWithWidgets = await this.dashboardRepository.saveDashboard(
      newDashboard
    );

    user.dashboards = user.dashboards
      ? [...user.dashboards, dashboardWithWidgets.dashboardId]
      : [dashboardWithWidgets.dashboardId];
    user = await this.userRepository.saveUser(user);

    return {
      dashboard: convertDashboardEntityToInterface(
        dashboardWithWidgets,
        widgetEntites
      ),
      user: convertUserEntityToInterface(user),
    };
  }
}
