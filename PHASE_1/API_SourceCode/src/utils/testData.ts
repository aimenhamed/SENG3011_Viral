import { Article } from "IArticle";
import { Report } from "IReport";
import { ReportEntity } from "../entity/Report.entity";
import { ArticleEntity } from "../entity/Article.entity";
import { AdviceEntity } from "../entity/Advice.entity";
import mockArticles from "./data/small.json";
// import { User } from "../interfaces/IUser";
// import { UserEntity } from "../entity/User.entity";

export const getReportEntity = (): ReportEntity => {
  const report = getMockReports()[0];
  const reportEntity = new ReportEntity();
  reportEntity.reportId = report.reportId;
  reportEntity.articleId = "art-123";
  reportEntity.diseases = report.diseases;
  reportEntity.eventDate = report.eventDate;
  reportEntity.locations = report.locations;
  reportEntity.syndromes = report.syndromes;
  return reportEntity;
};

export const getArticleEntity = (): ArticleEntity => {
  return {
    articleId: "art-123",
    url: mockArticles[0].URL,
    dateOfPublication: mockArticles[0]["Date of publication"],
    headline: mockArticles[0]["Title"],
    mainText: mockArticles[0].Content,
    reports: [getReportEntity()],
  };
};

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

// export const getMockUsers = (): User[] => {
//   return [
//     {
//       userId: "user-123",
//       name: "jeff",
//       email: "jeff1@gmail.com",
//       password: "mysecretpassword",
//       dashboards: ["dash-123"],
//       bookmarkedArticles: ["art-123"],
//     },
//     {
//       userId: "user-321",
//       name: "tom",
//       email: "tom1@gmail.com",
//       password: "mysecretpassword",
//       dashboards: ["dash-123"],
//       bookmarkedArticles: ["art-123"],
//     },
//     {
//       userId: "user1",
//       name: "Bob",
//       email: "bobthebuilder@gmail.com",
//       password: "abc123",
//       dashboards: [],
//       bookmarkedArticles: [],
//     },
//   ];
// };

// export const getUserEntity = (): UserEntity => {
//   const user = getMockUsers()[0];
//   const userEntity = new UserEntity();
//   userEntity.userId = user.userId;
//   userEntity.name = user.name;
//   userEntity.dashboards = user.dashboards;
//   userEntity.password = user.password;
//   userEntity.bookmarkedArticles = user.bookmarkedArticles;
//   userEntity.email = user.email;
//   return userEntity;
// };

export const getMockAdvice = (): AdviceEntity => {
  return {
    adviceId: "advice1",
    url: "https://www.idkwherethisgoes.com",
    country: "United States of America",
    continent: "North America",
    adviceLevel: "Do not Travel",
    lastUpdate: new Date(),
    latestAdvice: "abababababa",
  };
};
