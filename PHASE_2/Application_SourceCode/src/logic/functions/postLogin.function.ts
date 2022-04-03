import { Options } from "ky";
import {
  ApiError,
  IUserLoginRequestBody,
  IUserLoginSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { post } from "../createRequest";

export const postLogin = async (
  req: IUserLoginRequestBody
): Promise<IUserLoginSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return post(
    `${AppConfig.apiUrl}/v1/users/login/`,
    options
  ) as Promise<IUserLoginSuccessResponse>;
};
