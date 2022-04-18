import { Options } from "ky";
import {
  ApiError,
  IDeleteReviewRequestBody,
  IDeleteReviewSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { del } from "../createRequest";

export const deleteReview = async (
  req: IDeleteReviewRequestBody
): Promise<IDeleteReviewSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return del(
    `${AppConfig.apiUrl}/v1/reviews`,
    options
  ) as Promise<IDeleteReviewSuccessResponse>;
};
