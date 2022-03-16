export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  dashboards: string[];
  bookmarkedArticles: string[];
}
