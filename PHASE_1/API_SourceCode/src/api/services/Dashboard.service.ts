import { getLogger } from "../../utils/Logger";
import {
  ICommonDashboardRequestBody,
  ICommonDashboardSuccessResponse,
  IDeleteDashboardSuccessResponse,
} from "IApiResponses";
import { WidgetRepository } from "../../repositories/Widget.repository";
import { UserRepository } from "../../repositories/User.respository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { DashboardEntity } from "../../entity/Dashboard.entity";
import { WidgetEntity } from "../../entity/Widget.entity";
import { UserEntity } from "../../entity/User.entity";
import { HTTPError } from "../../utils/Errors";
import { notFoundError } from "../../utils/Constants";
import { convertUserEntityToInterface } from "../../converters/User.converter";
import { convertDashboardEntityToInterface } from "../../converters/Dashboard.converter";
import { DeleteResult } from "typeorm";

export class DashboardService {
  private logger = getLogger();
  constructor(
    readonly widgetRepository: WidgetRepository,
    readonly userRepository: UserRepository,
    readonly dashboardRepository: DashboardRepository
  ) {}

  async createDashboard(
    dashboardDetails: ICommonDashboardRequestBody
  ): Promise<ICommonDashboardSuccessResponse | undefined> {
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

  async updateDashboard(
    dashboardId: string,
    dashboardDetails: ICommonDashboardRequestBody
  ): Promise<ICommonDashboardSuccessResponse | undefined> {
    const user = await this.userRepository.getUser(dashboardDetails.userId);

    if (!user) {
      this.logger.error(`No user found with userId ${dashboardDetails.userId}`);
      throw new HTTPError(notFoundError);
    }

    const dashboard = await this.dashboardRepository.getDashboard(dashboardId);

    if (!dashboard) {
      this.logger.error(`No dashboard found with dashboardId ${dashboardId}`);
      throw new HTTPError(notFoundError);
    }

    const deletePromises: Promise<DeleteResult>[] =
      this.getDeletePromises(dashboard);
    Promise.all([...deletePromises]);

    const widgetEntites: WidgetEntity[] = [];
    const { widgets } = dashboardDetails;
    for (const widget of widgets) {
      const widgetEntity = new WidgetEntity();
      widgetEntity.articleId = widget.articleId;
      widgetEntity.widgetType = widget.widgetType;
      widgetEntity.dashboardId = dashboard.dashboardId;

      widgetEntites.push(await this.widgetRepository.saveWidget(widgetEntity));
    }

    dashboard.widgets = widgetEntites.map((item) => item.widgetId);
    const updateDashboard = await this.dashboardRepository.saveDashboard(
      dashboard
    );

    return {
      dashboard: convertDashboardEntityToInterface(
        updateDashboard,
        widgetEntites
      ),
      user: convertUserEntityToInterface(user),
    };
  }

  async deleteDashboard(
    dashboardId: string
  ): Promise<IDeleteDashboardSuccessResponse | undefined> {
    let dashboard = await this.dashboardRepository.getDashboard(dashboardId);

    if (!dashboard) {
      this.logger.error(`No dashboard found with dashboardId ${dashboardId}`);
      throw new HTTPError(notFoundError);
    }

    // proceed once all linked widgets are deleted
    const deletePromises: Promise<DeleteResult>[] =
      this.getDeletePromises(dashboard);
    Promise.allSettled([...deletePromises]);

    dashboard = await this.dashboardRepository.saveDashboard({
      ...dashboard,
      widgets: [],
    });

    // get user object
    let user = (await this.userRepository.getUser(
      dashboard.userId
    )) as UserEntity;
    if (!user) {
      this.logger.error(
        `Dashboard has nonexisting user ${dashboard.userId}. Is the dashboard's creator missing?`
      );
      throw new HTTPError(notFoundError);
    }

    // remove dashboard from user
    user.dashboards = user.dashboards.filter((e) => {
      return e !== dashboardId;
    });
    user = await this.userRepository.saveUser(user);

    // remove dashboard
    await this.dashboardRepository.deleteDashboard(dashboardId);

    return {
      user: convertUserEntityToInterface(user),
    };
  }

  getDeletePromises(dashboard: DashboardEntity): Promise<DeleteResult>[] {
    const deletePromises: Promise<DeleteResult>[] = [];
    for (const widget of dashboard.widgets) {
      deletePromises.push(this.widgetRepository.deleteWidget(widget));
    }
    return deletePromises;
  }
}
