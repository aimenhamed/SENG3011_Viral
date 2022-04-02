import config from "config";
import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import { ArticleService } from "./api/services/Article.service";
import { ArticleRepository } from "./repositories/Article.repository";
import { ArticleRouter } from "./api/routes/Article.router";
import { SearchRouter } from "./api/routes/Search.router";
import { SearchService } from "./api/services/Search.service";
import { ReportRepository } from "./repositories/Report.repository";
import { ReportRouter } from "./api/routes/Report.router";
import { ReportService } from "./api/services/Report.service";
import { UserRepository } from "./repositories/User.respository";
import { UserService } from "./api/services/User.service";
import { UserRouter } from "./api/routes/User.router";
import { AdviceRepository } from "./repositories/Advice.repository";
import { AdviceService } from "./api/services/Advice.service";
import { AdviceRouter } from "./api/routes/Advice.router";
import { CountryRepository } from "./repositories/Country.repository";
import { CommentRepository } from "./repositories/Comment.repository";
import { CommentRouter } from "./api/routes/Comment.router";
import { CommentService } from "./api/services/Comment.service";
export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");

  private readonly articleRepository = new ArticleRepository();
  private readonly reportRepository = new ReportRepository();
  private readonly userRepository = new UserRepository();
  private readonly adviceRepository = new AdviceRepository();
  private readonly countryRepository = new CountryRepository();
  private readonly commentRepository = new CommentRepository();
  // add services here
  private readonly articleService = new ArticleService(this.articleRepository);
  private readonly searchService = new SearchService(
    this.reportRepository,
    this.articleRepository
  );
  private readonly reportService = new ReportService(this.reportRepository);
  private readonly userService = new UserService(
    this.userRepository,
    this.articleRepository,
    this.countryRepository
  );
  private readonly adviceService = new AdviceService(this.adviceRepository);
  private readonly commentService = new CommentService(
    this.commentRepository,
    this.countryRepository,
    this.userRepository
  );
  constructor() {
    // add routers here .. e.g.
    const articleRouter = new ArticleRouter(this.articleService);
    const searchRouter = new SearchRouter(this.searchService);
    const reportRouter = new ReportRouter(this.reportService);
    const userRouter = new UserRouter(this.userService);
    const adviceRouter = new AdviceRouter(this.adviceService);
    const commentRouter = new CommentRouter(this.commentService);

    this.ex.addRouters(
      // ... add routers here
      articleRouter,
      searchRouter,
      reportRouter,
      userRouter,
      adviceRouter,
      commentRouter
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.ex.start(+(process.env.PORT || 3030));
    this.logger.info("Started HTTP Server");
  }

  async stop(): Promise<void> {
    await this.db.stop();
    await this.ex.stop();
  }
}
