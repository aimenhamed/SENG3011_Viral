import { Report } from "IReport";

export interface Article {
  url: string;
  dateOfPublication: string;
  headline: string;
  mainText: string;
  reports: Report[];
}
