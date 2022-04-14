import {
  ApiError,
  IAdviceSpecificSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { get } from "../createRequest";

export const getSpecificAdvice = async (
  country: string
): Promise<IAdviceSpecificSuccessResponse | ApiError> => {
  return get(
    `${AppConfig.apiUrl}/v1/advice?country=${country}`
  ) as Promise<IAdviceSpecificSuccessResponse>;
};
