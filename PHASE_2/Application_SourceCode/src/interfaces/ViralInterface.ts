export interface Country {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
  advice: Advice;
  comments: Comment[];
  reviews: Review[];
}

export interface SimpleCountry  {
  countryId: string;
  name: string;
  code: string;
  coords: number[];
}

export interface Advice {
  adviceId: string;
  url: string;
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
  bookmarkedCountries: Country[];
  bookmarkedArticles: Article[];
}

export interface UserOnly {
  userId: string;
  name: string;
  email: string;
}

export interface Comment {
  commentId: string;
  createdBy: User;
  message: string;
  date: Date;
}

export interface Flight {
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

export interface Review {
  reviewId: string;
  createdBy: UserOnly;
  rating: number;
  title: string;
  mainText: string;
  date: Date;
  upvotedBy: UserOnly[];
}
