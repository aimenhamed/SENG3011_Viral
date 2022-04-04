import { Options } from "ky";
import {
  ApiError,
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { put } from "../createRequest";

export const putBookmarkArticle = async (
  req: IUserBookmarkArticleRequestBody
): Promise<IUserBookmarkArticleSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return put(
    `${AppConfig.apiUrl}/v1/users/bookmark-article`,
    options
  ) as Promise<IUserBookmarkArticleSuccessResponse>;
};
