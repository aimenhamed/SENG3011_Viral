import { Article } from "./IArticle";
import { Country } from "./ICountry";

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
