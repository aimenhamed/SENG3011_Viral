import {
  ApiError,
  ISearchRequestHeaders,
  ISearchSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { Options } from "ky";
import AppConfig from "../config";
import { get } from "../createRequest";

export const getSearch = async (
  req: ISearchRequestHeaders
): Promise<ISearchSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      period_of_interest: JSON.stringify(req.periodOfInterest),
      key_terms: JSON.stringify(req.keyTerms),
      location: req.location,
    },
  };

  return get(
    `${AppConfig.apiUrl}/v1/search`,
    options
  ) as Promise<ISearchSuccessResponse>;
};
