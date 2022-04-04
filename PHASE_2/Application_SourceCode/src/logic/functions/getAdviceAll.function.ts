import {
  ApiError,
  IAdviceAllSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { get } from "../createRequest";

export const getAdviceAll = async (): Promise<
  IAdviceAllSuccessResponse | ApiError
> => {
  return get(
    `${AppConfig.apiUrl}/v1/advice/all`
  ) as Promise<IAdviceAllSuccessResponse>;
};
