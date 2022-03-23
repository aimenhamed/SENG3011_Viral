import got from "got";
import { formatError, getLogger } from "../utils/Logger";
import { AmadeusResponse } from "../interfaces/IFetchResponses";

export enum RequestPaths {
  AMADEUS,
  AMADEUS_TOKEN,
}

export const getRequestPath = (
  prefix: RequestPaths,
  pathId?: string
): string => {
  switch (prefix) {
    case RequestPaths.AMADEUS:
      return `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=${pathId}`;
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
    this.apiKey = `${process.env.API_KEY}`;
    this.apiSecret = `${process.env.API_SECRET}`;
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

      const diseaseResponse = JSON.parse(res.body) as AmadeusResponse;
      return diseaseResponse;
    } catch (err: any) {
      this.logger.error(
        `An error occurred when getting diseases for country ${countryCode}: ${formatError(
          err
        )}`
      );
    }
  }
}
