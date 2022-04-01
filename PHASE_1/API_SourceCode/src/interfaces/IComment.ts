import { Country } from "ICountry";
import { User } from "IUser";

export interface Comment {
  commentId: string;
  createdBy: User;
  country: Country;
  message: string;
  date: Date;
}
