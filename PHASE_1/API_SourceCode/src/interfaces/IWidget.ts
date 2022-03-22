export enum WidgetType {
  ARTICLE = "ARTICLE",
  REPORT_COUNT = "REPORT_COUNT",
  LATEST_ARTICLE = "LATEST_ARTICLE",
  BOOKMARKED_ARTICLES = "BOOKMARKED_ARTICLES",
  GRAPH = "GRAPH",
  TEXT = "TEXT",
  MAP = "MAP",
}

export enum GraphType {
  BAR = "BAR",
  PIPE = "PIPE",
  LINE = "LINE",
  STACKED_BAR = "STACKED_BAR",
}

export enum AxisType {
  TIME  = "time",
  TOTAL = "TOTAL",
}

export interface Widget {
  widgetId: string;
  widgetType: WidgetType;
  articleId: string;
}
