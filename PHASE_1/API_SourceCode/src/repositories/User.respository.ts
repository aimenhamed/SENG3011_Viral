import { UserEntity } from "../entity/User.entity";
import { getRepository } from "typeorm";

export class UserRepository {
  async saveUser(newUser: UserEntity): Promise<UserEntity> {
    return await getRepository(UserEntity).save(newUser);
  }
}
