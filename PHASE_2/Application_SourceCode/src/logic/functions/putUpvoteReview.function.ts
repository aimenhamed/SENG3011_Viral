import { Options } from "ky";
import {
  ApiError,
  IPutUpvoteReviewRequestBody,
  IPutUpvoteReviewSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { put } from "../createRequest";

export const putUpvoteReview = async (
  req: IPutUpvoteReviewRequestBody
): Promise<IPutUpvoteReviewSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return put(
    `${AppConfig.apiUrl}/v1/reviews/upvote`,
    options
  ) as Promise<IPutUpvoteReviewSuccessResponse>;
};
