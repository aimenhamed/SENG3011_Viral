import { Options } from "ky";
import {
  ApiError,
  IPostReviewRequestBody,
  IPostReviewSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { post } from "../createRequest";

export const postReview = async (
  req: IPostReviewRequestBody
): Promise<IPostReviewSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return post(
    `${AppConfig.apiUrl}/v1/reviews`,
    options
  ) as Promise<IPostReviewSuccessResponse>;
};
