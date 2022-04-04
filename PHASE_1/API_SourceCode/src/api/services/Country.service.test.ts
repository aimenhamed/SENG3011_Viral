import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  notFoundError,
  internalServerError,
} from "../../utils/Constants";
import { CountryService } from "./Country.service";
import { FetchWrapper } from "../../modules/FetchWrapper";
import { getMockFlights } from "../../utils/testData";

describe("Country service", () => {
  let fetchWrapper: FetchWrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    fetchWrapper = new FetchWrapper();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const countryService = () => new CountryService(fetchWrapper);

  describe("Search flights", () => {
    it("should resolve and return expected flights", () => {
      const service = countryService();
      const flights = getMockFlights();

      const flightDetails = {
        originLocationCode: "SYD",
        destinationLocationCode: "BKK",
        departureDate: "2022-11-01",
        adults: "1",
      };

      expect(service.getFlights(flightDetails)).resolves.toEqual({
        flights,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw HTTP 404 error if no flights are found", () => {
      const service = countryService();

      const errorResult = new HTTPError(notFoundError);
      const flightDetails = {
        originLocationCode: "SYD",
        destinationLocationCode: "PAR",
        departureDate: "2022-11-01",
        adults: "1",
      };
      expect(service.getFlights(flightDetails)).rejects.toThrow(errorResult);
    });
  });
});
