import { Options } from "ky";
import {
  ApiError,
  ICommentPostRequestBody,
  ICommentPostSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { post } from "../createRequest";

export const postComment = async (
  req: ICommentPostRequestBody
): Promise<ICommentPostSuccessResponse | ApiError> => {
  const options: Options = {
    body: JSON.stringify(req),
  };
  return post(
    `${AppConfig.apiUrl}/v1/comments`,
    options
  ) as Promise<ICommentPostSuccessResponse>;
};
