import { createConnection, getConnection } from "typeorm";
import { getLogger } from "../utils/Logger";
import { IDatabaseConfig } from "IConfig";
import config from "config";
import { ArticleEntity } from "../entity/Article.entity";
import { ReportEntity } from "../entity/Report.entity";
import { UserEntity } from "../entity/User.entity";
import { AdviceEntity } from "../entity/Advice.entity";

export default class Database {
  private logger = getLogger();
  constructor(readonly connectionName: string) {}
  // testing new db: POSTGRESQL_USER=fsggrwwrbsxbkk POSTGRESQL_PASSWORD=0bbabdc7704f4a9cc4b6fbf80a2acc5c8f5f0c70e6a9bcc5238a0e31b5191f56 POSTGRESQL_HOST=ec2-18-210-191-5.compute-1.amazonaws.com POSTGRESQL_DATABASE=dd4u9qmc5pk0gv
  // testing locally: POSTGRESQL_USER=postgres POSTGRESQL_PASSWORD=mysecretpassword POSTGRESQL_HOST=0.0.0.0 POSTGRESQL_DATABASE=mydb

  async start(): Promise<void> {
    const databaseConfig: IDatabaseConfig = config.get("database");
    // add entities below
    await createConnection({
      ...databaseConfig,
      name: this.connectionName,
      type: "postgres",
      host: "ec2-18-210-191-5.compute-1.amazonaws.com",
      port: 5432,
      username: "fsggrwwrbsxbkk",
      password: "0bbabdc7704f4a9cc4b6fbf80a2acc5c8f5f0c70e6a9bcc5238a0e31b5191f56",
      database: "dd4u9qmc5pk0gv",
      // schema: "public",
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [
        ArticleEntity,
        ReportEntity,
        UserEntity,
        AdviceEntity,
      ],
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
