import { getLogger } from "../Logger";
import { Express } from "express";
import { setupExpress } from "./Express";
import HttpServer from "./HttpServer";
import Database from "../../modules/Database";
import config from "config";

export default class App {
  readonly logger = getLogger();
  readonly server: HttpServer;
  private ex: Express;
  private db = new Database(config.get("api.dbName"));

  constructor() {
    this.ex = setupExpress();
    this.server = new HttpServer(this.ex);
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.server.start();
    this.logger.info("Started HTTP Server and Database");
  }

  async stop(): Promise<void> {
    await this.server.stop();
    await this.db.stop();
  }
}
