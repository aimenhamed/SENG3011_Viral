import got from "got";
import { formatError, getLogger } from "../utils/Logger";
import {
  AmadeusFlightResponse,
  AmadeusResponse,
} from "../interfaces/IFetchResponses";
import { SimpleConsoleLogger } from "typeorm";

export enum RequestPaths {
  AMADEUS,
  AMADEUS_FLIGHTS,
  AMADEUS_TOKEN,
}

export const getRequestPath = (
  prefix: RequestPaths,
  pathId?: string,
  olc?: string,
  dlc?: string,
  depDate?: string,
  adults?: string
): string => {
  switch (prefix) {
    case RequestPaths.AMADEUS:
      return `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${pathId}`;
    case RequestPaths.AMADEUS_FLIGHTS:
      return `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${olc}&destinationLocationCode=${dlc}&departureDate=${depDate}&adults=${adults}&nonStop=true`;
    case RequestPaths.AMADEUS_TOKEN:
      return `https://test.api.amadeus.com/v1/security/oauth2/token`;
    default:
      return "";
  }
};

export class FetchWrapper {
  private readonly logger = getLogger();
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private accessToken: string;

  constructor() {
    this.apiKey = `VDPSvlYDu2GGea9xzRGUGEe0DDorBywd`;
    this.apiSecret = `JX9GXGrL2a3BoBKv`;
  }

  async getToken(): Promise<any> {
    try {
      const path = getRequestPath(RequestPaths.AMADEUS_TOKEN);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const res = await got.post(path, {
        headers,
        body: `grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.apiSecret}`,
      });

      const { access_token } = JSON.parse(res.body);
      this.accessToken = access_token;
    } catch (err: any) {
      this.logger.error(
        `An error occurred when getting access token: ${formatError(err)}`
      );
    }
  }

  async getCountryDiseases(countryCode: string): Promise<any> {
    try {
      await this.getToken();
      const path = getRequestPath(RequestPaths.AMADEUS, countryCode);
      const request = {
        options: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      };

      const res = await got.get(path, {
        ...request.options,
        retry: {
          methods: ["GET"],
          limit: 3,
        },
      });

      const diseaseResponse: AmadeusResponse = JSON.parse(res.body);
      return diseaseResponse;
    } catch (err: any) {
      this.logger.error(
        `An error occurred when getting diseases for country ${countryCode}: ${formatError(
          err
        )}`
      );
    }
  }

  async getFlightOffers(
    originLocationCode: string,
    destinationLocationCode: string,
    departureDate: string,
    adults: string
  ): Promise<any> {
    try {
      await this.getToken();

      const pathId = "";
      const path = getRequestPath(
        RequestPaths.AMADEUS_FLIGHTS,
        pathId,
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults
      );

      const request = {
        options: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      };

      const res = await got.get(path, {
        ...request.options,
        retry: {
          methods: ["GET"],
          limit: 3,
        },
      });

      const flightsResponse: AmadeusFlightResponse = JSON.parse(res.body);
      return flightsResponse;
    } catch (err: any) {
      this.logger.error(
        `An error occurred when getting flights with origin: ${originLocationCode}, destination: ${destinationLocationCode}, departure date: ${departureDate}, adults: ${adults}: ${formatError(
          err
        )}`
      );
    }
  }
}
