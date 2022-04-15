import { ApiError } from "src/interfaces/ResponseInterface";
import { Flight } from "src/interfaces/ViralInterface";
import AppConfig from "../config";
import { get } from "../createRequest";
import { IFlightQuery } from "../../interfaces/ResponseInterface";

export interface FlightRes {
  flights: Flight[];
}

export const getFlightInfo = async (req: IFlightQuery):
Promise<FlightRes | ApiError> =>
  get(`${AppConfig.apiUrl}/v1/country/flights?originLocationCode=${req.originLocationCode}&destinationLocationCode=${req.destinationLocationCode}&departureDate=${req.departureDate}&adults=${req.adults}`) as Promise<FlightRes>;
