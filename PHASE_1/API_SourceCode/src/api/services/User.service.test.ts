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
        it("should throw 400 error if user already exists", ()=> {
            const service = userService();
            const existingUser = getMockUsers()[0];
            userRepository.getUserByEmail = jest.fn().mockReturnValue(existingUser);
            
            const errorResult = new HTTPError(badRequest)
            expect(service.registerUser(existingUser)).rejects.toThrow(errorResult);
        });

        it("should respond with 200 if the user is successfully registered", () => {
            const service = userService();
            const userRecord = getMockUsers()[0];
            const {userId, bookmarkedArticles, dashboards, ...newUser} = userRecord;
            
            userRepository.getUserByEmail =jest.fn().mockReturnValue(undefined)
            userRepository.saveUser = jest.fn().mockReturnValue(userRecord)
            expect(service.registerUser(newUser)).resolves.toEqual({
                newUser
            });
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
});