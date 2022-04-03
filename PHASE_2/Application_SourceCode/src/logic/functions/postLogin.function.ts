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
  console.log(req);

  const options: Options = {
    body: JSON.stringify(req),
  };
  console.log(options);
  return post(`${AppConfig.apiUrl}/v1/users/login/`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }) as Promise<IUserLoginSuccessResponse>;
};
