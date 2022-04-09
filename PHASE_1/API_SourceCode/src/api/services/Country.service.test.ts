import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  notFoundError,
  internalServerError,
} from "../../utils/Constants";
import { CountryService } from "./Country.service";
import { CountryRepository } from "../../repositories/Country.repository";
import { FetchWrapper } from "../../modules/FetchWrapper";
import {
  getMockCountries,
  getMockCountryDiseases,
  getMockFlightOffers,
  getMockFlights,
} from "../../utils/testData";

describe("Country service", () => {
  let fetchWrapper: FetchWrapper;
  let countryRepository: CountryRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    fetchWrapper = new FetchWrapper();
    countryRepository = new CountryRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const countryService = () =>
    new CountryService(fetchWrapper, countryRepository);

  describe("getCountry", () => {
    it("should resolve and return country info", () => {
      const service = countryService();
      const country = getMockCountries()[0];
      countryRepository.getAllCountryInfoByName = jest
        .fn()
        .mockReturnValue(country);
      fetchWrapper.getCountryDiseases = jest
        .fn()
        .mockReturnValue(getMockCountryDiseases());

      expect(service.getCountryInfo(country.name)).resolves.toEqual({
        country,
        data: getMockCountryDiseases(),
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw an error HTTP 404 if specified name does not exist", () => {
      const service = countryService();
      const countryName = "non-existent country";
      countryRepository.getAllCountryInfoByName = jest
        .fn()
        .mockReturnValue(undefined);
      fetchWrapper.getCountryDiseases = jest.fn().mockReturnValue({});

      const errorResult = new HTTPError(notFoundError);
      expect(service.getCountryInfo(countryName)).rejects.toThrow(errorResult);
    });

    it("should throw an error HTTP 500 if Amadeus Server fails to retrieve data", () => {
      const service = countryService();
      const country = getMockCountries()[0];
      countryRepository.getAllCountryInfoByName = jest
        .fn()
        .mockReturnValue(country);
      fetchWrapper.getCountryDiseases = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getCountryInfo(country.name)).rejects.toThrow(errorResult);
    });
  });

  describe("getAdviceLevels", () => {
    it("should resolve and return a list of advice levels for each country", () => {
      const service = countryService();
      const countries = getMockCountries();
      const adviceLevels = countries.map((c) => {
        return { country: c.name, adviceLevel: c.advice.adviceLevel };
      });
      countryRepository.getAllAdviceLevels = jest
        .fn()
        .mockReturnValue(adviceLevels);

      expect(service.getAllAdvice()).resolves.toEqual({
        countries: adviceLevels,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw 500 error if cannot access db", () => {
      const service = countryService();
      countryRepository.getAllAdviceLevels = jest
        .fn()
        .mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getAllAdvice()).rejects.toThrow(errorResult);
    });
  });

  describe("Search flights", () => {
    it("should resolve and return expected flights", () => {
      const service = countryService();
      const flights = getMockFlights();
      fetchWrapper.getFlightOffers = jest
        .fn()
        .mockReturnValue(getMockFlightOffers());

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
