import { getLogger } from "../../utils/Logger";
import { getLog } from "../../utils/Helpers";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { FetchWrapper } from "../../modules/FetchWrapper";
import { CountryRepository } from "../../repositories/Country.repository";
import { AdviceRepository } from "../../repositories/Advice.repository";
import { string } from "@hapi/joi";
import { IAdviceAllSuccessResponse } from "IApiResponses";

export class CountryService {
  private logger = getLogger();
  constructor(
    readonly fetchWrapper: FetchWrapper,
    readonly countryRepository: CountryRepository
  ) {}

  async getCountryInfo(countryName: string) {
    const country = await this.countryRepository.getAllCountryInfoByName(
      countryName
    );

    if (country === undefined) {
      this.logger.error(`No country ${countryName} found in db`);
      throw new HTTPError(notFoundError);
    }

    const data = await this.fetchWrapper.getCountryDiseases(country.code);
    if (data === undefined) {
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully retrieved info for country ${countryName}, responding to client`
    );

    return {
      country,
      data,
      log: getLog(new Date()),
    };
  }

  async getAllAdvice(): Promise<IAdviceAllSuccessResponse> {
    const advices = await this.countryRepository.getAllAdviceLevels();
    if (advices === undefined) {
      this.logger.error(`Received no advice from the db`);
      throw new HTTPError(internalServerError);
    }

    this.logger.info(
      `Successfully retrieved all country advice, responding to client`
    );
    return {
      countries: advices,
      log: getLog(new Date()),
    };
  }

  async getFlights(flightDetails: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults: string;
  }): Promise<any | undefined> {
    const data = await this.fetchWrapper.getFlightOffers(
      flightDetails.originLocationCode,
      flightDetails.destinationLocationCode,
      flightDetails.departureDate,
      flightDetails.adults
    );

    // flights array object
    let flights = [
      {
        departure: string,
        arrival: string,
        duration: string,
        departureTime: string,
        arrivalTime: string,
        carrierCode: string,
        currency: string,
        price: string,
      },
    ];

    data.data.forEach((element: any) => {
      const newFlight = {
        departure: element.itineraries[0].segments[0].departure.iataCode,
        arrival: element.itineraries[0].segments[0].arrival.iataCode,
        duration: element.itineraries[0].duration,
        departureTime: element.itineraries[0].segments[0].departure.at,
        arrivalTime: element.itineraries[0].segments[0].arrival.at,
        carrierCode: element.itineraries[0].segments[0].carrierCode,
        currency: element.price.currency,
        price: element.price.grandTotal,
      };
      flights = [...flights, newFlight];
    });

    flights.shift(); // it always has an empty element in flights[0] so remove that for ease

    if (flights.length === 0) {
      this.logger.error(
        `No flights with with origin: ${flightDetails.originLocationCode}, destination: ${flightDetails.destinationLocationCode}, departure date: ${flightDetails.departureDate}, adults: ${flightDetails.adults} found`
      );
      throw new HTTPError(notFoundError);
    }

    return {
      flights,
      log: getLog(new Date()),
    };
  }
}
