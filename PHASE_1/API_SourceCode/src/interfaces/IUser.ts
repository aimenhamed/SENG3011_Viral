import { Article } from "./IArticle";

export interface User {
  userId: string;
  name: string;
  email: string;
  bookmarkedCountries: string[];
  bookmarkedArticles: Article[];
}
