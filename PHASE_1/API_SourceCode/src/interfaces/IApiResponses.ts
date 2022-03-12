import { Article } from "IArticle";
import { Report } from "IReport";

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

export interface IReportsDumpSuccessResponse {
  reports: Report[];
}
export interface ISearchRequestHeaders {
  periodOfInterest: IPeriodOfInterest;
  location: string;
  keyTerms: string[];
}

export type ISearchSuccessResponse = IArticlesDumpSuccessResponse;
