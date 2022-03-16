import { Widget } from "IWidget";
import { WidgetEntity } from "../entity/Widget.entity";

export const convertWidgetEntityToInterface = (
  entity: WidgetEntity
): Widget => {
  return {
    widgetId: entity.widgetId,
    widgetType: entity.widgetType,
    articleId: entity.articleId,
  };
};
