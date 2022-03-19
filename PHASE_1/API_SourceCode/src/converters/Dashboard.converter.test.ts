import {
  getDashboardEntity,
  getMockDashboards,
  getWidgetEntity,
} from "../utils/testData";
import { convertDashboardEntityToInterface } from "./Dashboard.converter";

describe("convertDashboardEntityToInterface", () => {
  it("should convert ArticleEntity to Article interface", () => {
    const entity = getDashboardEntity();
    const dashboard = getMockDashboards()[0];
    dashboard.widgets.length = 1;
    const widgetEntities = [getWidgetEntity()];
    expect(convertDashboardEntityToInterface(entity, widgetEntities)).toEqual(
      dashboard
    );
  });
});
