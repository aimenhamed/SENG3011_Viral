import { Article } from "IArticle";
import { Dashboard } from "IDashboard";
import { Report } from "IReport";
import { User } from "IUser";
import { WidgetType } from "IWidget";

export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface Log {
  teamName: string;
  accessTime: string;
  dataSource: string;
}

export interface IPeriodOfInterest {
  start: string;
  end: string;
}

export interface IArticlesDumpSuccessResponse {
  articles: Article[];
  log: Log;
}

export interface IArticleSpecificSuccessResponse {
  article: Article;
  log: Log;
}

export interface IReportsDumpSuccessResponse {
  reports: Report[];
  log: Log;
}

export interface IReportSpecificSuccessResponse {
  report: Report;
  log: Log;
}

export interface ISearchRequestHeaders {
  periodOfInterest: IPeriodOfInterest;
  location: string;
  keyTerms: string[];
}

export type ISearchSuccessResponse = IArticlesDumpSuccessResponse;

export interface IUserRegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface IUserRegisterSuccessResponse {
  user: User;
  log: Log;
}

export interface IUserBookmarkArticleRequestBody {
  userId: string;
  articleId: string;
}

export interface IUserBookmarkArticleSuccessResponse {
  user: User;
  article: Article;
  log: Log;
}

export interface IUserRemoveBookmarkSuccessResponse {
  user: User;
  log: Log;
}

export interface WidgetRequest {
  widgetType: WidgetType;
  articleId: string;
}

export interface ICommonDashboardRequestBody {
  userId: string;
  widgets: WidgetRequest[];
}

export interface ICommonDashboardSuccessResponse {
  dashboard: Dashboard;
  user: User;
  log: Log;
}

export type IDeleteDashboardSuccessResponse = IUserRegisterSuccessResponse;

export interface IGetDashboardSuccessResponse {
  dashboard: Dashboard;
  log: Log;
}

export interface IUserDashboardRequestBody {
  userId: string;
  dashboardId: string;
}

export type IUserDashboardSuccessResponse = ICommonDashboardSuccessResponse;

export interface IUserLoginRequestBody {
  email: string;
  password: string;
}

export interface IUserLoginSuccessResponse {
  user: User;
  log: Log;
}

export interface IUserSpecificSuccessResponse {
  user: User;
  log: Log;
}
