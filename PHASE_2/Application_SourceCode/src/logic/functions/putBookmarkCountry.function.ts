import { Options } from "ky";
import {
  ApiError,
  IUserBookmarkCountryRequestBody,
  IUserBookmarkCountrySuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { put } from "../createRequest";

export const putBookmarkCountry = async (
  req: IUserBookmarkCountryRequestBody
): Promise<IUserBookmarkCountrySuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return put(
    `${AppConfig.apiUrl}/v1/users/bookmark-country`,
    options
  ) as Promise<IUserBookmarkCountrySuccessResponse>;
};
