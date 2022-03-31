import { Article } from "./IArticle";

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  bookmarkedCountries: string[];
  bookmarkedArticles: Article[];
}
