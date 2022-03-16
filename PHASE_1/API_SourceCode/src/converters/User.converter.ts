import { User } from "IUser";
import { UserEntity } from "../entity/User.entity";

export const convertUserEntityToInterface = (entity: UserEntity): User => {
  return {
    userId: entity.userId,
    name: entity.name,
    email: entity.email,
    password: entity.password,
    bookmarkedArticles: entity.bookmarkedArticles,
    dashboards: entity.dashboards,
  };
};
