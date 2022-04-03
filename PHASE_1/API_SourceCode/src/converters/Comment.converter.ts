import { Comment, CommentNoCountry } from "IComment";
import { CommentEntity } from "../entity/Comment.entity";
import { convertUserEntityToSimpleInterface } from "./User.converter";
import { convertCountryEntityToInterface } from "./Country.converter";

export const convertCommentEntityToInterface = (
  entity: CommentEntity
): Comment => {
  return {
    commentId: entity.commentId,
    createdBy: convertUserEntityToSimpleInterface(entity.createdBy),
    country: convertCountryEntityToInterface(entity.country),
    message: entity.message,
    date: entity.date,
  };
};

export const convertCommentEntityToSimpleInterface = (
  entity: CommentEntity
): CommentNoCountry => {
  return {
    commentId: entity.commentId,
    createdBy: convertUserEntityToSimpleInterface(entity.createdBy),
    message: entity.message,
    date: entity.date,
  };
};
