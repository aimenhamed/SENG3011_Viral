import { Report } from "IReport";

export interface Article {
  articleId: string;
  url: string;
  dateOfPublication: string;
  headline: string;
  mainText: string;
  reports: Report[];
}
