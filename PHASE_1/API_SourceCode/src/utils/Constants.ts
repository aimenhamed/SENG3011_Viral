import { IHttpError } from "../interfaces/IApiResponses";
import { HTTPError } from "./Errors";

export const unauthorizedError: IHttpError = {
  errorCode: 401,
  errorMessage: "Unauthorized error occured",
};

export const badRequest: IHttpError = {
  errorCode: 400,
  errorMessage: "Bad request",
};

export const notFoundError: IHttpError = {
  errorCode: 404,
  errorMessage: "Resource not found",
};

export const timeoutError: IHttpError = {
  errorCode: 408,
  errorMessage: "Timeout, the transaction hasn't completed yet, please retry",
};

export const internalServerError: IHttpError = {
  errorCode: 500,
  errorMessage: "An internal server error occurred",
};

export const getResponseFromHttpError = (error: HTTPError): IHttpError => {
  return {
    errorCode: error.errorCode,
    errorMessage: error.errorMessage,
  };
};

export const baseLog = {
  teamName: "Team Viral",
  dataSource: "https://www.who.int/csr/don/en/",
};

export const secret: string = require("crypto").randomBytes(64).toString("hex");

export const jwt = require("jsonwebtoken");
