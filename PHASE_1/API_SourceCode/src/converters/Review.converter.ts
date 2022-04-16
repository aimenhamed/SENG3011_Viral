import { Review, ReviewNoCountry } from "IReview";
import { ReviewEntity } from "../entity/Review.entity";
import { convertUserEntityToSimpleInterface } from "./User.converter";
import { convertCountryEntityToSimpleInterface } from "./Country.converter";

export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): Review => {
  return {
    reviewId: entity.reviewId,
    createdBy: convertUserEntityToSimpleInterface(entity.createdBy),
    country: convertCountryEntityToSimpleInterface(entity.country),
    rating: entity.rating,
    title: entity.title,
    mainText: entity.mainText,
    date: entity.date,
  };
};

export const convertReviewEntityToSimpleInterface = (
  entity: ReviewEntity
): ReviewNoCountry => {
  return {
    reviewId: entity.reviewId,
    createdBy: convertUserEntityToSimpleInterface(entity.createdBy),
    rating: entity.rating,
    title: entity.title,
    mainText: entity.mainText,
    date: entity.date,
  };
};
