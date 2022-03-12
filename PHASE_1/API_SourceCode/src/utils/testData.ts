import { Article } from "IArticle";
import { Report } from "IReport";
import mockArticles from "./data/small.json";

export const getMockArticles = (): Article[] => {
  return [
    {
      articleId: "art-123",
      url: mockArticles[0].URL,
      dateOfPublication: mockArticles[0]["Date of publication"],
      headline: mockArticles[0]["Title"],
      mainText: mockArticles[0].Content,
      reports: [],
    },
    {
      articleId: "art-1234",
      url: mockArticles[1].URL,
      dateOfPublication: mockArticles[1]["Date of publication"],
      headline: mockArticles[1]["Title"],
      mainText: mockArticles[1].Content,
      reports: [],
    },
    {
      articleId: "art-12345",
      url: mockArticles[2].URL,
      dateOfPublication: mockArticles[2]["Date of publication"],
      headline: mockArticles[2]["Title"],
      mainText: mockArticles[2].Content,
      reports: [],
    },
  ];
};

// going with a single report per article for this atm and will have to sus how to differentiate syndromes
export const getMockReports = (): Report[] => {
  return [
    {
    reportId: "rep-123",
    diseases: [mockArticles[0]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[0]["Date of publication"],
    locations: [mockArticles[0]["Title"].split(" - ")[1]],
    },
    {
    reportId: "rep-1234",
    diseases: [mockArticles[1]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[1]["Date of publication"],
    locations: [mockArticles[1]["Title"].split(" - ")[1]],
    },
    {
      reportId: "rep-12345",
    diseases: [mockArticles[2]["Title"].split(" - ")[0]],
    syndromes: [],
    eventDate: mockArticles[2]["Date of publication"],
    locations: [mockArticles[2]["Title"].split(" - ")[1]],
    }
  ];
};