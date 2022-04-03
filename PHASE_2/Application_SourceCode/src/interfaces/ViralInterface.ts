export interface Country {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
}

export interface Advice {
  adviceId: string;
  url: string;
  country: Country;
  continent: string;
  adviceLevel: string;
  latestAdvice: string;
  lastUpdate: string;
}

export interface IAdviceOnly {
  country: string;
  adviceLevel: string;
}

export interface Report {
  reportId: string;
  diseases: string[];
  syndromes: string[];
  eventDate: string;
  locations: string[];
}

export interface Article {
  articleId: string;
  url: string;
  dateOfPublication: string;
  headline: string;
  mainText: string;
  reports: Report[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
  bookmarkedCountries: string[];
  bookmarkedArticles: Article[];
}

export interface Comment {
  commentId: string;
  createdBy: User;
  country: Country;
  message: string;
  date: Date;
}

export interface Flight {
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}
