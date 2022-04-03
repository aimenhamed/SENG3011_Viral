import { Options } from "ky";
import {
  ApiError,
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { post } from "../createRequest";

export const postRegister = async (
  req: IUserRegisterRequestBody
): Promise<IUserRegisterSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return post(
    `${AppConfig.apiUrl}/v1/users/register`,
    options
  ) as Promise<IUserRegisterSuccessResponse>;
};
