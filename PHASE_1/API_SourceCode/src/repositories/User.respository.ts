import { UserEntity } from "../entity/User.entity";
import { getRepository } from "typeorm";

export class UserRepository {
  async getUser(userId: string): Promise<UserEntity | undefined> {
    return await getRepository(UserEntity).findOne({ userId });
  }

  async saveUser(newUser: UserEntity): Promise<UserEntity> {
    return await getRepository(UserEntity).save(newUser);
  }
}
