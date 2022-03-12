import config from "config";
import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import { NameService } from "./api/services/Name.service";
import { NameRouter } from "./api/routes/Name.router";
import { ArticleService } from "./api/services/Article.service";
import { ArticleRepository } from "./repositories/Article.repository";
import { ArticleRouter } from "./api/routes/Article.router";
import { SearchRouter } from "./api/routes/Search.router";
import { SearchService } from "./api/services/Search.service";
import { ReportRepository } from "./repositories/Report.repository";
import { ReportRouter } from "./api/routes/Report.router";
import { ReportService } from "./api/services/Report.service";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");

  private readonly articleRepository = new ArticleRepository();
  private readonly reportRepository = new ReportRepository();
  // add services here
  private readonly nameService = new NameService();
  private readonly articleService = new ArticleService(this.articleRepository);
  private readonly searchService = new SearchService(
    this.reportRepository,
    this.articleRepository
  );
  private readonly reportService = new ReportService(this.reportRepository);

  constructor() {
    // add routers here .. e.g.
    const nameRouter = new NameRouter(this.nameService);
    const articleRouter = new ArticleRouter(this.articleService);
    const searchRouter = new SearchRouter(this.searchService);
    const reportRouter = new ReportRouter(this.reportService);

    this.ex.addRouters(
      // ... add routers here
      nameRouter,
      articleRouter,
      searchRouter,
      reportRouter
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.ex.start(config.get("api.port"));
    this.logger.info("Started HTTP Server");
  }

  async stop(): Promise<void> {
    await this.db.stop();
    await this.ex.stop();
  }
}
