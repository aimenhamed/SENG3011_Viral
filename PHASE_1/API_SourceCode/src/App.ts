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
import { DashboardRepository } from "./repositories/Dashboard.repository";
import { DashboardService } from "./api/services/Dashboard.service";
import { WidgetRepository } from "./repositories/Widget.repository";
import { DashboardRouter } from "./api/routes/Dashboard.router";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");

  private readonly articleRepository = new ArticleRepository();
  private readonly reportRepository = new ReportRepository();
  private readonly userRepository = new UserRepository();
  private readonly dashboardRepository = new DashboardRepository();
  private readonly widgetRepository = new WidgetRepository();
  // add services here
  private readonly articleService = new ArticleService(this.articleRepository);
  private readonly searchService = new SearchService(
    this.reportRepository,
    this.articleRepository
  );
  private readonly reportService = new ReportService(this.reportRepository);
  private readonly userService = new UserService(this.userRepository);
  private readonly dashboardService = new DashboardService(
    this.widgetRepository,
    this.userRepository,
    this.dashboardRepository
  );

  constructor() {
    // add routers here .. e.g.
    const articleRouter = new ArticleRouter(this.articleService);
    const searchRouter = new SearchRouter(this.searchService);
    const reportRouter = new ReportRouter(this.reportService);
    const userRouter = new UserRouter(this.userService);
    const dashboardRouter = new DashboardRouter(this.dashboardService);

    this.ex.addRouters(
      // ... add routers here
      articleRouter,
      searchRouter,
      reportRouter,
      userRouter,
      dashboardRouter
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
