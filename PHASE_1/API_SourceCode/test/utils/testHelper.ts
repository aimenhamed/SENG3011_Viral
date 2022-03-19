import { getConnection } from "typeorm";
import { UserEntity } from "../../src/entity/User.entity";

export const waitAsync = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export const setTestSecrets = (): void => {
  process.env.PORT = "4993";
  process.env.POSTGRESQL_USER = "postgres";
  process.env.POSTGRESQL_PASSWORD = "mysecretpassword";
  process.env.POSTGRESQL_HOST = "0.0.0.0";
  process.env.POSTGRESQL_DATABASE = "mydb";
};

export const clearDb = async () => {
  const repository = getConnection().getRepository(UserEntity);
  await Promise.all([
    await repository.query(`TRUNCATE public.article CASCADE`),
    await repository.query(`TRUNCATE public.report CASCADE`),
    await repository.query(`TRUNCATE public.widgets CASCADE`),
    await repository.query(`TRUNCATE public.user CASCADE`),
    await repository.query(`TRUNCATE public.dashboard CASCADE`),
  ]);
};
