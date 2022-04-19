import { Country, SimpleCountry } from "ICountry";
import { CountryEntity } from "../entity/Country.entity";
import { convertAdviceEntityToInterface } from "./Advice.converter";
import { convertCommentEntityToSimpleInterface } from "./Comment.converter";
import { convertReviewEntityToSimpleInterface } from "./Review.converter";

export const convertCountryEntityToInterface = (
  entity: CountryEntity
): Country => {
  return {
    countryId: entity.countryId,
    name: entity.name,
    code: entity.code,
    coords: entity.coords,
    advice: entity.advice && convertAdviceEntityToInterface(entity.advice),
    comments: entity.comments.map((c) =>
      convertCommentEntityToSimpleInterface(c)
    ),
    reviews: entity.reviews.map((r) => convertReviewEntityToSimpleInterface(r)),
  };
};

export const convertCountryEntityToSimpleInterface = (
  entity: CountryEntity
): SimpleCountry => {
  return {
    countryId: entity.countryId,
    name: entity.name,
    code: entity.code,
    coords: entity.coords,
  };
};
