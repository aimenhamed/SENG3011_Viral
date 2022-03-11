import config from "config";
import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import { NameService } from "./api/services/Name.service";
import { NameRouter } from "./api/routes/Name.router";
import { ArticleService } from "./api/services/Article.service";
import { ArticleRepository } from "./repositories/Article.repository";
import { ArticleRouter } from "./api/routes/Article.router";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");

  private readonly articleRepository = new ArticleRepository();

  // add services here
  private readonly nameService = new NameService();
  private readonly articleService = new ArticleService(this.articleRepository);

  constructor() {
    // add routers here .. e.g.
    const nameRouter = new NameRouter(this.nameService);
    const articleRouter = new ArticleRouter(this.articleService);

    this.ex.addRouters(
      // ... add routers here
      nameRouter,
      articleRouter
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
