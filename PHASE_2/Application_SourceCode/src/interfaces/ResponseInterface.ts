import { Article, Report, User, Advice, IAdviceOnly } from "./ViralInterface";

export interface ApiError {
  errorCode: string;
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
  token: string;
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
  token: string;
  user: User;
  log: Log;
}

export interface IUserSpecificSuccessResponse {
  user: User;
  log: Log;
}

export interface IAdviceSpecificSuccessResponse {
  advice: Advice;
  log: Log;
}

export interface IAdviceAllSuccessResponse {
  countries: IAdviceOnly[];
  log: Log;
}

export interface ICommentPostRequestBody {
  countryId: string;
  message: string;
  userId: string;
}

export interface ICommentPostSuccessResponse {
  comment: Comment;
  log: Log;
}
