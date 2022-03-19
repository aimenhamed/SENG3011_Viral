import { Article } from "IArticle";
import { Report } from "IReport";
import { User } from "IUser";
import { Dashboard } from "IDashboard";
import { Widget, WidgetType } from "../interfaces/IWidget";
import mockArticles from "./data/small.json";
import { DashboardEntity } from "../entity/Dashboard.entity";

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
      diseases: ["Measles"],
      syndromes: [],
      eventDate: mockArticles[0]["Date of publication"],
      locations: ["Afghanistan"],
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
    },
  ];
};

export const getMockUsers = (): User[] => {
  return [
    {
      userId: "user1",
      name: "Bob",
      email: "bobthebuilder@gmail.com",
      password: "abc123",
      dashboards: [],
      bookmarkedArticles: []
    }
  ]
}

export const getMockDashboards = (): DashboardEntity[] => {
  return [
    {
      dashboardId: "dashboard1",
      userId: "user1",
      widgets: [ getMockWidgets()[0].widgetId ]
    }
  ]
}

export const getMockWidgets = (): Widget[] => {
  return [
    {
      widgetId: "widget1",
      widgetType: WidgetType.ARTICLE,
      articleId: "art-123"
    }
  ]
}
