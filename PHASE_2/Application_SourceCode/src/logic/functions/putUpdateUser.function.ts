import { Options } from "ky";
import {
  ApiError,
  IUserUpdateRequestBody,
  IUserUpdateSuccessResponse,
} from "src/interfaces/ResponseInterface";
import AppConfig from "../config";
import { put } from "../createRequest";

export const putUserUpdate = async (
  userId: string,
  req: IUserUpdateRequestBody
): Promise<IUserUpdateSuccessResponse | ApiError> => {
  const options: Options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  return put(
    `${AppConfig.apiUrl}/v1/users/${userId}`,
    options
  ) as Promise<IUserUpdateSuccessResponse>;
};
