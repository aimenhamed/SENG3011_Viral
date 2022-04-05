import { getLogger } from "../../utils/Logger";
import { getLog } from "../../utils/Helpers";
import { HTTPError } from "../../utils/Errors";
import { notFoundError } from "../../utils/Constants";
import { FetchWrapper } from "../../modules/FetchWrapper";
import { string } from "@hapi/joi";

export class CountryService {
  private logger = getLogger();
  constructor(readonly fetchWrapper: FetchWrapper) {}

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
