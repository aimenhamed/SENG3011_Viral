import {
  ApiError,
  ISearchSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { Options } from "ky";
import { keyTerms } from "src/constants/KeyTerms";
import AppConfig from "../config";
import { get } from "../createRequest";

export const getSearch = async (
  location: string
): Promise<ISearchSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      period_of_interest: '{"start":"2009-09-23","end":"2021-09-24"}',
      key_terms: JSON.stringify(keyTerms),
      location,
    },
  };

  return get(
    `${AppConfig.apiUrl}/v1/search`,
    options
  ) as Promise<ISearchSuccessResponse>;
};
