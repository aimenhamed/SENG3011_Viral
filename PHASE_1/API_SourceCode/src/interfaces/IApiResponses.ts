import { Advice } from "IAdvice";
import { Article } from "IArticle";
import { Report } from "IReport";
import { User } from "IUser";
import { Comment, CommentNoCountry } from "IComment";
import { IAdviceOnly } from "IAdvice";
import { AmadeusData } from "IFetchResponses";
import { Country } from "ICountry";
import { Review } from "IReview";

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
  token: string;
  user: User;
  log: Log;
}

export interface IUserBookmarkArticleRequestBody {
  userId: string;
  articleId: string;
  status: boolean;
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
  data: AmadeusData;
  comments: CommentNoCountry[];
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

export interface IUserBookmarkCountryRequestBody {
  userId: string;
  countryId: string;
  status: boolean;
}

export interface IUserBookmarkCountrySuccessResponse {
  user: User;
  country: Country;
  log: Log;
}

export interface IUserUpdateRequestBody {
  name?: string;
  password?: string;
}

export interface IUserUpdateSuccessResponse {
  user: User;
  log: Log;
}

export interface IFlightQuery {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
}

export interface IReviewPostRequestBody {
  userId: string;
  countryId: string;
  rating: number;
  title: string;
  mainText: string;
}

export interface IReviewPostSuccessResponse {
  review: Review;
  log: Log;
}

export interface IReviewUpvoteRequestBody {
  userId: string;
  reviewId: string;
  status: boolean;
}

export interface IReviewUpvoteSuccessResponse {
  review: Review;
  user: User;
  log: Log;
}

export interface IReviewDeleteRequestBody {
  userId: string;
  reviewId: string;
}

export interface IReviewDeleteSuccessResponse {
  log: Log;
}
