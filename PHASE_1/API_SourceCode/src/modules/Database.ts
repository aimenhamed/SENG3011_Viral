import { createConnection, getConnection } from "typeorm";
import { getLogger } from "../utils/Logger";
import { IDatabaseConfig } from "IConfig";
import config from "config";
import { ArticleEntity } from "../entity/Article.entity";
import { ReportEntity } from "../entity/Report.entity";

export default class Database {
  private logger = getLogger();
  constructor(readonly connectionName: string) {}

  async start(): Promise<void> {
    const databaseConfig: IDatabaseConfig = config.get("database");
    // add entities below
    await createConnection({
      ...databaseConfig,
      name: this.connectionName,
      type: "postgres",
      host: process.env.POSTGRESQL_HOST,
      port: 5432,
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      // schema: "public",
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [ArticleEntity, ReportEntity],
    });
    this.logger.info(
      `Started connection with connection name ${this.connectionName}`
    );
  }

  async stop(): Promise<void> {
    await getConnection(this.connectionName).close();
    this.logger.info(
      `Stopped connection with connection name ${this.connectionName}`
    );
  }
}
