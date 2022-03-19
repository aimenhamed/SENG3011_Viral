import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  badRequest,
  internalServerError,
  notFoundError,
} from "../../utils/Constants";
import { ArticleRepository } from "../../repositories/Article.repository";
import { UserRepository } from "../../repositories/User.respository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { WidgetRepository } from "../../repositories/Widget.repository";
import { UserService } from "./User.service";
import { getMockArticles, getMockUsers, getMockDashboards, getMockWidgets, getDashboardEntity } from "../../utils/testData";


describe("UserService", () => {
    let userRepository: UserRepository
    let articleRepository: ArticleRepository;
    let dashboardRepository: DashboardRepository;
    let widgetRepository: WidgetRepository;
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      userRepository = new UserRepository();
      articleRepository = new ArticleRepository();
      dashboardRepository = new DashboardRepository();
      widgetRepository = new WidgetRepository();
    });
    afterAll(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    const userService = () => new UserService(userRepository, articleRepository, dashboardRepository, widgetRepository);

    describe("registerNewUser", () => {
        it("should resolve with 200 if the user is successfully registered", () => {
            const service = userService();
            const userRecord = getMockUsers()[2];
            const {userId, bookmarkedArticles, dashboards, ...newUser} = userRecord;
            
            userRepository.getUserByEmail =jest.fn().mockReturnValue(undefined)
            userRepository.saveUser = jest.fn().mockReturnValue(userRecord)
            expect(service.registerUser(newUser)).resolves.toEqual({
                user: userRecord,
                log: {
                    ...baseLog,
                    accessTime: expect.any(String)
                }
            });
        });

        it("should throw 400 error if user already exists", ()=> {
            const service = userService();
            const existingUser = getMockUsers()[2];
            userRepository.getUserByEmail = jest.fn().mockReturnValue(existingUser);
            
            const errorResult = new HTTPError(badRequest)
            expect(service.registerUser(existingUser)).rejects.toThrow(errorResult);
        });

        it("should respond with 500 error if the user could not be added", ()=> {
            const service = userService();
            const {userId, bookmarkedArticles, dashboards, ...newUser} = getMockUsers()[0];

            userRepository.getUserByEmail = jest.fn().mockReturnValue(undefined);
            userRepository.saveUser = jest.fn().mockReturnValue(undefined);

            const errorResult = new HTTPError(internalServerError);
            expect(service.registerUser(newUser)).rejects.toThrow(errorResult);
        })
    });

    describe("bookmarkArticle", () => {
        it("should resolve with 200 if article is successfully bookmarked", ()=> {
            const service = userService();
            const user = getMockUsers()[2];
            const article = getMockArticles()[0];
            const updatedUser = {...user, bookmarkedArticles: [article.articleId]}
            userRepository.getUser = jest.fn().mockReturnValue(user);
            articleRepository.getArticle = jest.fn().mockReturnValue(article);
            userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
            expect(service.bookmarkArticle({
                userId: user.userId,
                articleId: article.articleId,
            })).resolves.toEqual({
                user: updatedUser,
                article: article,
                log: {
                    ...baseLog,
                    accessTime: expect.any(String)
                }
            });
        });

        it("should resolve with 200 if a second article is successfully bookmarked", ()=> {
          const service = userService();
          const user = getMockUsers()[2];
          const article = getMockArticles()[0];
          const article2 = getMockArticles()[1];
          let updatedUser = {...user, bookmarkedArticles: [article.articleId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          articleRepository.getArticle = jest.fn().mockReturnValue(article);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          
          service.bookmarkArticle({
            userId: user.userId,
            articleId: article.articleId,
          })
          updatedUser = {...user, bookmarkedArticles: [article.articleId, article2.articleId]}
          userRepository.getUser = jest.fn().mockReturnValue({...user, bookmarkedArticles: [article.articleId]});
          articleRepository.getArticle = jest.fn().mockReturnValue(article2);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          

          expect(service.bookmarkArticle({
              userId: user.userId,
              articleId: article2.articleId,
          })).resolves.toEqual({
              user: updatedUser,
              article: article2,
              log: {
                  ...baseLog,
                  accessTime: expect.any(String)
              }
          });
        });

        it("should throw 400 error if user does not exist", ()=> {
            const service = userService();
            const article = getMockArticles()[0];
            userRepository.getUser = jest.fn().mockReturnValue(undefined);
            articleRepository.getArticle = jest.fn().mockReturnValue(article);
            
            const errorResult = new HTTPError(badRequest)
            expect(service.bookmarkArticle({
                userId: "id does not exist",
                articleId: article.articleId,
            })).rejects.toThrow(errorResult);
        });

        it("should throw 400 error if article does not exist", ()=> {
            const service = userService();
            const user = getMockUsers()[2];
            userRepository.getUser = jest.fn().mockReturnValue(user);
            articleRepository.getArticle = jest.fn().mockReturnValue(undefined);

            const errorResult = new HTTPError(badRequest)
            expect(service.bookmarkArticle({
                userId: user.userId,
                articleId: "id does not exist",
            })).rejects.toThrow(errorResult);
        });

        it("should throw 400 error if article has already been bookmarked", ()=> {
            const service = userService();
            const user = getMockUsers()[2];
            const article = getMockArticles()[0];
            const updatedUser = {...user, bookmarkedArticles: [article.articleId]}
            userRepository.getUser = jest.fn().mockReturnValue(user);
            articleRepository.getArticle = jest.fn().mockReturnValue(article);
            userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
            service.bookmarkArticle({
                userId: user.userId,
                articleId: article.articleId,
            })

            const errorResult = new HTTPError(badRequest)

            expect(service.bookmarkArticle({
                userId: user.userId,
                articleId: article.articleId,
            })).rejects.toThrow(errorResult);

        });

    })

    describe("removeBookmarkedArticle", () => {
        it("should resolve with 200 if article is successfully removed", ()=> {
            const service = userService();
            const updatedUser = getMockUsers()[2]
            const article = getMockArticles()[0];
            const user = {...updatedUser, bookmarkedArticles: [article.articleId]}
            userRepository.getUser = jest.fn().mockReturnValue(user);
            articleRepository.getArticle = jest.fn().mockReturnValue(article);
            userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
            
            expect(service.removeBookmark({
                userId: user.userId,
                articleId: article.articleId,
            })).resolves.toEqual({
                user: updatedUser,
                log: {
                    ...baseLog,
                    accessTime: expect.any(String)
                }
            });
            
        });

        it("should throw 400 if user does not exist", ()=> {
          const service = userService();
          const updatedUser = getMockUsers()[2]
          const article = getMockArticles()[0];
          const user = {...getMockUsers()[0], bookmarkedArticles: [article.articleId]}
          userRepository.getUser = jest.fn().mockReturnValue(undefined);
          articleRepository.getArticle = jest.fn().mockReturnValue(article);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          
          const errorResult = new HTTPError(badRequest); 

          expect(service.removeBookmark({
              userId: "unknown userId",
              articleId: article.articleId,
          })).rejects.toThrow(errorResult);
        });

        it("should throw 400 if bookmark doesn't exist", ()=> {
          const service = userService();
          const updatedUser = getMockUsers()[2]
          const article = getMockArticles()[0];
          const user = {...updatedUser, bookmarkedArticles: [article.articleId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          articleRepository.getArticle = jest.fn().mockReturnValue(article);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          
          const errorResult = new HTTPError(badRequest); 

          expect(service.removeBookmark({
              userId: user.userId,
              articleId: "unknown article",
          })).rejects.toThrow(errorResult);
        });

        it("should throw 500 if remove operation fails", ()=> {
          const service = userService();
          const updatedUser = getMockUsers()[2]
          const article = getMockArticles()[0];
          const user = {...updatedUser, bookmarkedArticles: [article.articleId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          articleRepository.getArticle = jest.fn().mockReturnValue(article);
          userRepository.saveUser = jest.fn().mockReturnValue(undefined);
          
          const errorResult = new HTTPError(internalServerError); 

          expect(service.removeBookmark({
              userId: user.userId,
              articleId: article.articleId,
          })).rejects.toThrow(errorResult);
        });
    })

    describe("addDashboardToUser", () => {
        it("should resolve with 200 if dashboard was successfully added", ()=> {
            const service = userService();
            const user = getMockUsers()[2];
            const dashboard = getDashboardEntity();
            const widgets = getMockWidgets();
            const updatedUser = {...user, dashboards: [dashboard.dashboardId]}
            userRepository.getUser = jest.fn().mockReturnValue(user);
            dashboardRepository.getDashboard = jest.fn().mockReturnValue(dashboard);
            userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
            widgetRepository.getWidgetById = jest.fn().mockReturnValue(widgets);

            expect(service.addDashboardToUser({
                userId: user.userId,
                dashboardId: dashboard.dashboardId,
            })).resolves.toEqual({
                user: updatedUser,
                dashboard: {...dashboard, widgets: widgets},
                log: {
                    ...baseLog,
                    accessTime: expect.any(String)
                }
            });
        });

        it("should throw 400 error if it user does not exist", ()=> {
          const service = userService();
          const user = getMockUsers()[2];
          const dashboard = getDashboardEntity();
          const widgets = getMockWidgets();
          const updatedUser = {...user, dashboards: [dashboard.dashboardId]}
          userRepository.getUser = jest.fn().mockReturnValue(undefined);
          dashboardRepository.getDashboard = jest.fn().mockReturnValue(dashboard);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          widgetRepository.getWidgetById = jest.fn().mockReturnValue(widgets);

          const errorResult =  new HTTPError(badRequest);

          expect(service.addDashboardToUser({
            userId: "non-existent user",
            dashboardId: dashboard.dashboardId,
          })).rejects.toThrow(errorResult);
        });

        it("should throw 400 error if it dashboard does not exist", ()=> {
          const service = userService();
          const user = getMockUsers()[2];
          const dashboard = getDashboardEntity();
          const widgets = getMockWidgets();
          const updatedUser = {...user, dashboards: [dashboard.dashboardId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          dashboardRepository.getDashboard = jest.fn().mockReturnValue(undefined);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          widgetRepository.getWidgetById = jest.fn().mockReturnValue(widgets);

          const errorResult =  new HTTPError(badRequest);

          expect(service.addDashboardToUser({
            userId: user.userId,
            dashboardId: "non-existent dashboard",
          })).rejects.toThrow(errorResult);
        });

        it("should throw 400 error if it dashboard does not exist", ()=> {
          const service = userService();
          const user = getMockUsers()[2];
          const dashboard = getDashboardEntity();
          const widgets = getMockWidgets();
          const updatedUser = {...user, dashboards: [dashboard.dashboardId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          dashboardRepository.getDashboard = jest.fn().mockReturnValue(undefined);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          widgetRepository.getWidgetById = jest.fn().mockReturnValue(widgets);

          const errorResult =  new HTTPError(badRequest);

          expect(service.addDashboardToUser({
            userId: user.userId,
            dashboardId: "non-existent dashboard",
          })).rejects.toThrow(errorResult);
        });

        it("should throw 400 error if it dashboard has already been saved", ()=> {
          const service = userService();
          const user = getMockUsers()[2];
          const dashboard = getDashboardEntity();
          const widgets = getMockWidgets();
          const updatedUser = {...user, dashboards: [dashboard.dashboardId]}
          userRepository.getUser = jest.fn().mockReturnValue(user);
          dashboardRepository.getDashboard = jest.fn().mockReturnValue(dashboard);
          userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
          widgetRepository.getWidgetById = jest.fn().mockReturnValue(widgets);

          service.addDashboardToUser({
            userId: user.userId,
            dashboardId: dashboard.dashboardId,
          })

          const errorResult =  new HTTPError(badRequest);

          expect(service.addDashboardToUser({
            userId: user.userId,
            dashboardId: dashboard.dashboardId,
          })).rejects.toThrow(errorResult);
        });
    })
});