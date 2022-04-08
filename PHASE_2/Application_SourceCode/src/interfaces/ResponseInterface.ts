import {
  Article,
  Report,
  User,
  Advice,
  IAdviceOnly,
  Comment,
  Country,
} from "./ViralInterface";

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

export interface IUserUpdateRequestBody {
  name?: string;
  password?: string;
}

export interface IUserUpdateSuccessResponse {
  user: User;
  log: Log;
}

export interface IAdviceSpecificSuccessResponse {
  country: Country;
  data: AmadeusResponse;
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

export interface AmadeusResponse {
  data: AmadeusData;
}

export interface AmadeusData {
  area: {
    name: string;
  };
  summary: string;
  diseaseRiskLevel: string;
  diseaseInfection: {
    date: string;
    level: string;
  };
  diseaseCases: {
    date: string;
    deaths: number;
    confirmed: number;
  };
  hotspots: string;
  areaAccessRestriction: {
    transportation: {
      date: string;
      text: string;
      isBanned: string;
    };
    quarantineModality: {
      date: string;
      text: string;
      rules: string;
    };
    mask: {
      date: string;
      text: string;
      isRequired: string;
    };
    exit: {
      date: string;
      text: string;
      isBanned: string;
    };
    diseaseVaccination: {
      date: string;
      isRequired: string;
      acceptedCertificates: string[];
      qualifiedVaccines: string[];
      policy: string;
    };
  };
  areaVaccinated: {
    date: string;
    vaccinationDoseStatus: string;
    percentage: number;
  }[];
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

export interface IFlightQuery {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
}
