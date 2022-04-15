import { Review, ReviewNoCountry } from "IReview";
import { ReviewEntity } from "../entity/Review.entity";
import { convertUserEntityToInterface, convertUserEntityToSimpleInterface } from "./User.converter";
import { convertCountryEntityToSimpleInterface } from "./Country.converter";

export const convertReviewEntityToInterface = (
  entity: ReviewEntity
): Review => {
  console.log("check6\n");
  return {
    reviewId: entity.reviewId,
    createdBy: convertUserEntityToSimpleInterface(entity.createdBy),
    country: convertCountryEntityToSimpleInterface(entity.country),
    rating: entity.rating,
    title: entity.title,
    mainText: entity.mainText,
    date: entity.date,
    upvotedBy: entity.upvotedBy.map((user) =>
    convertUserEntityToSimpleInterface(user)
    ),
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
    upvotedBy: entity.upvotedBy.map((user) =>
    convertUserEntityToSimpleInterface(user)
    ),
  };
};
