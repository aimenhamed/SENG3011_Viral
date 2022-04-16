import { User, UserOnly } from "IUser";
import { UserEntity } from "../entity/User.entity";
import { convertArticleEntityToInterface } from "./Article.converter";
import { convertCountryEntityToSimpleInterface } from "./Country.converter";

export const convertUserEntityToInterface = (entity: UserEntity): User => {
  return {
    userId: entity.userId,
    name: entity.name,
    email: entity.email,
    // password: entity.password,
    bookmarkedArticles: entity.bookmarkedArticles.map((article) =>
      convertArticleEntityToInterface(article)
    ),
    bookmarkedCountries: entity.bookmarkedCountries.map((country) =>
      convertCountryEntityToSimpleInterface(country)
    ),
  };
};

export const convertUserEntityToSimpleInterface = (
  entity: UserEntity
): UserOnly => {
  return {
    userId: entity.userId,
    name: entity.name,
    email: entity.email,
  };
};
