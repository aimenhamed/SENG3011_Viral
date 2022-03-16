import { Widget } from "IWidget";

export interface Dashboard {
  dashboardId: string;
  userId: string;
  widgets: Widget[];
}
