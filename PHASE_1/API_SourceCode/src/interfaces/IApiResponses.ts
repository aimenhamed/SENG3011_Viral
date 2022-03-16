import { Article } from "IArticle";
import { Dashboard } from "IDashboard";
import { Report } from "IReport";
import { User } from "IUser";
import { WidgetType } from "IWidget";

export interface IHttpError {
  errorCode: number;
  errorMessage: string;
}

export interface IPeriodOfInterest {
  start: string;
  end: string;
}

export interface IPostNameRequestBody {
  name: string;
}

export interface IPostNameSuccessResponse {
  nameId: string;
  fullName: string;
}

export interface IArticlesDumpSuccessResponse {
  articles: Article[];
}

export interface IArticleSpecificSuccessResponse {
  article: Article;
}

export interface IReportsDumpSuccessResponse {
  reports: Report[];
}

export interface IReportSpecificSuccessResponse {
  report: Report;
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
}

export interface IUserBookmarkArticleRequestBody {
  userId: string;
  articleId: string;
}

export interface IUserBookmarkArticleSuccessResponse {
  user: User;
  article: Article;
}

export interface WidgetRequest {
  widgetType: WidgetType;
  articleId: string;
}

export interface IPostDashboardRequestBody {
  userId: string;
  widgets: WidgetRequest[];
}

export interface IPostDashboardSuccessResponse {
  dashboard: Dashboard;
  user: User;
}

export interface IUserDashboardRequestBody {
  userId: string;
  dashboardId: string;
}

export type IUserDashboardSuccessResponse = IPostDashboardSuccessResponse;
