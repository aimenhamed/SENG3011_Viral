export enum WidgetType {
  ARTICLE = "ARTICLE",
}

export interface Widget {
  widgetId: string;
  widgetType: WidgetType;
  articleId: string;
}
