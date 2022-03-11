import { Article } from "IArticle";
import { Report } from "IReport";
import mockArticles from "./data/small.json";

export const getMockArticles = (): Article[] => {
  return [
    {
      url: mockArticles[0].URL,
      dateOfPublication: mockArticles[0]["Date of publication"],
      headline: mockArticles[0]["Title"],
      mainText: mockArticles[0].Content,
      reports: [],
    },
    {
      url: mockArticles[1].URL,
      dateOfPublication: mockArticles[1]["Date of publication"],
      headline: mockArticles[1]["Title"],
      mainText: mockArticles[1].Content,
      reports: [],
    },
    {
      url: mockArticles[2].URL,
      dateOfPublication: mockArticles[2]["Date of publication"],
      headline: mockArticles[2]["Title"],
      mainText: mockArticles[2].Content,
      reports: [],
    },
  ];
};

export const getMockReports = (): Report[] => {
  return [
    {
    diseases: [mockArticles[0]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[0]["Date of publication"],
    location: mockArticles[0]["Title"].split(" - ")[1],
    },
    {
    diseases: [mockArticles[1]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[1]["Date of publication"],
    location: mockArticles[1]["Title"].split(" - ")[1],
    },
    {
    diseases: [mockArticles[2]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[2]["Date of publication"],
    location: mockArticles[2]["Title"].split(" - ")[1],
    }
  ];
};