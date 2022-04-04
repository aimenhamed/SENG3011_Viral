import { Country } from "ICountry";
import { UserOnly } from "IUser";

export interface Comment {
  commentId: string;
  createdBy: UserOnly;
  country: Country;
  message: string;
  date: Date;
}

export interface CommentNoCountry {
  commentId: string;
  createdBy: UserOnly;
  message: string;
  date: Date;
}
