import { createConnection, getConnection } from "typeorm";
import { getLogger } from "../utils/Logger";
import { IDatabaseConfig } from "IConfig";
import config from "config";
import { ArticleEntity } from "../entity/Article.entity";
import { ReportEntity } from "../entity/Report.entity";
import { UserEntity } from "../entity/User.entity";
import { DashboardEntity } from "../entity/Dashboard.entity";
import { WidgetEntity } from "../entity/Widget.entity";

export default class Database {
  private logger = getLogger();
  constructor(readonly connectionName: string) {}
  // testing new db: POSTGRESQL_USER=ytodeyyosrgpen POSTGRESQL_PASSWORD=8356074ac9f65aad0aa219bcf46118e9ea940529b2db3307ed143cc033034a38 POSTGRESQL_HOST=ec2-35-153-35-94.compute-1.amazonaws.com POSTGRESQL_DATABASE=db9penvi7i6jkk
  // testing locally: POSTGRESQL_USER=postgres POSTGRESQL_PASSWORD=mysecretpassword POSTGRESQL_HOST=0.0.0.0 POSTGRESQL_DATABASE=mydb

  async start(): Promise<void> {
    const databaseConfig: IDatabaseConfig = config.get("database");
    // add entities below
    await createConnection({
      ...databaseConfig,
      name: this.connectionName,
      type: "postgres",
      host: "ec2-35-153-35-94.compute-1.amazonaws.com",
      port: 5432,
      username: "ytodeyyosrgpen",
      password: "8356074ac9f65aad0aa219bcf46118e9ea940529b2db3307ed143cc033034a38",
      database: "db9penvi7i6jkk",
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
        DashboardEntity,
        WidgetEntity,
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
