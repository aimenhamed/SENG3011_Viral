import { Article } from "./IArticle";
import { SimpleCountry } from "./ICountry";

export interface User {
  userId: string;
  name: string;
  email: string;
  bookmarkedCountries: SimpleCountry[];
  bookmarkedArticles: Article[];
}

export interface UserOnly {
  userId: string;
  name: string;
  email: string;
}
