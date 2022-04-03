import { getLogger } from "../../utils/Logger";
import { getLog } from "../../utils/Helpers";
import { FetchWrapper } from "../../modules/FetchWrapper";

export class CountryService {
  private logger = getLogger();
  constructor(readonly fetchWrapper: FetchWrapper) {}

  async getFlights(flightDetails?: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults: string;
    max: string;
  }): Promise<any | undefined> {
    this.logger.info("Flight API unimplemented. Returning dummy data");
    return {
      flights: [
        {
          departure: "SYD",
          destination: "LAX",
          departureTime: "10:15",
          arrivalTime: "07:00",
          duration: "13h 45min",
          price: 1280,
        },
        {
          departure: "SYD",
          destination: "LAX",
          departureTime: "12:15",
          arrivalTime: "09:00",
          duration: "13h 45min",
          price: 1200,
        },
        {
          departure: "SYD",
          destination: "LAX",
          departureTime: "14:15",
          arrivalTime: "11:00",
          duration: "13h 45min",
          price: 1180,
        },
        {
          departure: "SYD",
          destination: "LAX",
          departureTime: "16:15",
          arrivalTime: "13:00",
          duration: "13h 45min",
          price: 1160,
        },
        {
          departure: "SYD",
          destination: "LAX",
          departureTime: "18:15",
          arrivalTime: "15:00",
          duration: "13h 45min",
          price: 1140,
        },
      ],
      log: getLog(new Date()),
    };
  }
}
