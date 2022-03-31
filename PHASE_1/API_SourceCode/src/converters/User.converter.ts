import { User } from "IUser";
import { UserEntity } from "../entity/User.entity";
import { convertArticleEntityToInterface } from "./Article.converter";

export const convertUserEntityToInterface = (entity: UserEntity): User => {
  return {
    userId: entity.userId,
    name: entity.name,
    email: entity.email,
    password: entity.password,
    bookmarkedArticles: entity.bookmarkedArticles.map((article) =>
      convertArticleEntityToInterface(article)
    ),
    bookmarkedCountries: entity.bookmarkedCountries,
  };
};
