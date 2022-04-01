import { Comment } from "IComment";
import { CommentEntity } from "../entity/Comment.entity";
import { convertUserEntityToInterface } from "./User.converter";
import { convertCountryEntityToInterface } from "./Country.converter";

export const convertCommentEntityToInterface = (
  entity: CommentEntity
): Comment => {
  return {
    commentId: entity.commentId,
    createdBy: convertUserEntityToInterface(entity.createdBy),
    country: convertCountryEntityToInterface(entity.country),
    message: entity.message,
    date: entity.date,
  };
};
