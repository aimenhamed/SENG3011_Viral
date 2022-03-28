import { Advice } from "IAdvice";
import { Article } from "IArticle";
import { Report } from "IReport";
import { User } from "IUser";

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

export interface IAdviceSpecificSuccessResponse {
  advice: Advice,
  log: Log,
}