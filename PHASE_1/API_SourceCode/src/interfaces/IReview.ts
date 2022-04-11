import { SimpleCountry } from "ICountry";
import { UserOnly } from "IUser";

export interface Review {
  reviewId: string;
  createdBy: UserOnly;
  country: SimpleCountry;
  rating: number;
  title: string;
  mainText: string;
  date: Date;
}

export interface ReviewNoCountry {
  reviewId: string;
  createdBy: UserOnly;
  rating: number;
  title: string;
  mainText: string;
  date: Date;
}
