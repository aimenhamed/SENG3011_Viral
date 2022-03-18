import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  badRequest,
  internalServerError,
  notFoundError,
} from "../../utils/Constants";
import { ArticleRepository } from "../../repositories/Article.repository";
import { DashboardRepository } from "../../repositories/Dashboard.repository";
import { UserRepository } from "../../repositories/User.respository";
import { ArticleService } from "./Article.service";
import { UserService } from "./User.service";
import { getMockArticles, getMockUsers, getMockDashboards } from "../../utils/testData";


describe("UserService", () => {
    let userRepository: UserRepository
    let articleRepository: ArticleRepository;
    let dashboardRepository: DashboardRepository;
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      userRepository = new UserRepository();
      articleRepository = new ArticleRepository();
      dashboardRepository = new DashboardRepository();
    });
    afterAll(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    const userService = () => new UserService(userRepository, articleRepository, dashboardRepository);

    describe("registerNewUser", () => {
        it("should resolve with 200 if the user is successfully registered", () => {
            const service = userService();
            const userRecord = getMockUsers()[0];
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
            const existingUser = getMockUsers()[0];
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
            const user = getMockUsers()[0];
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
            const user = getMockUsers()[0];
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
            const user = getMockUsers()[0];
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
            const user = {...getMockUsers()[0], bookmarkedArticles: [article.articleId]}
            const article = getMockArticles()[0];
            userRepository.getUser = jest.fn().mockReturnValue(user);
            articleRepository.getArticle = jest.fn().mockReturnValue(article);
            userRepository.saveUser = jest.fn().mockReturnValue(updatedUser);
            service.bookmarkArticle({
                userId: user.userId,
                articleId: article.articleId,
            })
            
            
        });

        // it("should throw 400 error if user does not exist", ()=> {
        //     const service = userService();
        //     const article = getMockArticles()[0];
        //     userRepository.getUser = jest.fn().mockReturnValue(undefined);
        //     articleRepository.getArticle = jest.fn().mockReturnValue(article);
            
        //     const errorResult = new HTTPError(badRequest)
        //     expect(service.bookmarkArticle({
        //         userId: "id does not exist",
        //         articleId: article.articleId,
        //     })).rejects.toThrow(errorResult);
        // });

        // it("should throw 400 error if article does not exist", ()=> {
        //     const service = userService();
        //     const user = getMockUsers()[0];
        //     userRepository.getUser = jest.fn().mockReturnValue(user);
        //     articleRepository.getArticle = jest.fn().mockReturnValue(undefined);

        //     const errorResult = new HTTPError(badRequest)
        //     expect(service.bookmarkArticle({
        //         userId: user.userId,
        //         articleId: "id does not exist",
        //     })).rejects.toThrow(errorResult);
        // });

        // it("should throw 400 error if article has already been bookmarked", ()=> {
        //     const service = userService();
        //     const user = getMockUsers()[0];
        //     const article = getMockArticles()[0];
        //     userRepository.getUser = jest.fn().mockReturnValue(user);
        //     articleRepository.getArticle = jest.fn().mockReturnValue(article);

        //     service.bookmarkArticle({
        //         userId: user.userId,
        //         articleId: article.articleId,
        //     })

        //     const errorResult = new HTTPError(badRequest)
        //     expect(service.bookmarkArticle({
        //         userId: user.userId,
        //         articleId: article.articleId,
        //     })).rejects.toThrow(errorResult);
        // });

    })
});