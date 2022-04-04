import { ApiError } from "src/interfaces/ResponseInterface";
import { Flight } from "src/interfaces/ViralInterface";
import AppConfig from "../config";
import { get } from "../createRequest";

export interface FlightRes {
  flights: Flight[];
}

export const getFlightInfo = async (): // req: FlightReq
Promise<FlightRes | ApiError> =>
  get(`${AppConfig.apiUrl}/v1/country/flights`) as Promise<FlightRes>;
