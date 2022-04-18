import { SimpleCountry } from "ICountry";
import { UserOnly, User } from "IUser";

export interface Review {
  reviewId: string;
  createdBy: UserOnly;
  country: SimpleCountry;
  rating: number;
  title: string;
  mainText: string;
  date: Date;
  upvotedBy: UserOnly[];
}

export interface ReviewNoCountry {
  reviewId: string;
  createdBy: UserOnly;
  rating: number;
  title: string;
  mainText: string;
  date: Date;
  upvotedBy: UserOnly[];
}
