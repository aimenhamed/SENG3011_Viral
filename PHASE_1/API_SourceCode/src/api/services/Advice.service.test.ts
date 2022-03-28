import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  notFoundError,
} from "../../utils/Constants";
import { AdviceRepository } from "../../repositories/Advice.repository";
import { AdviceService } from "./Advice.service";
import { getMockAdvice } from "../../utils/testData";

describe("AdviceService", () => {
  let repository: AdviceRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    repository = new AdviceRepository();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const adviceService = () => new AdviceService(repository);

  describe("getAdvice", () => {
    it("should resolve and return expected advice", ()=> {
      const service = adviceService();
      const advice = getMockAdvice();
      repository.getAdviceByCountry = jest.fn().mockReturnValue(advice)

      expect(service.getAdvice(advice.country)).resolves.toEqual({
        advice,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        }
      })
    });

    it("should throw HTTP 404 error if no advice is found", () => {
      const service = adviceService();
      repository.getAdviceByCountry = jest.fn().mockReturnValue(undefined);
  
      const errorResult = new HTTPError(notFoundError);
      const country = "non-existent-country"
      expect(service.getAdvice(country)).rejects.toThrow(errorResult);
    });
    
  });
});