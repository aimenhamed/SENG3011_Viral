import { HTTPError } from "../../utils/Errors";
import {
  baseLog,
  notFoundError,
  internalServerError,
} from "../../utils/Constants";
import { AdviceRepository } from "../../repositories/Advice.repository";
import { CommentRepository } from "../../repositories/Comment.repository";
import { AdviceService } from "./Advice.service";
import { FetchWrapper } from "../../modules/FetchWrapper";
import { getMockAdvice, getMockAdvices } from "../../utils/testData";

describe("AdviceService", () => {
  let repository: AdviceRepository;
  let commentRepository: CommentRepository;
  let fetchWrapper: FetchWrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    repository = new AdviceRepository();
    commentRepository = new CommentRepository();
    fetchWrapper = new FetchWrapper();
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  const adviceService = () =>
    new AdviceService(repository, commentRepository, fetchWrapper);

  describe("getAdvice", () => {
    it("should resolve and return expected advice", () => {
      const service = adviceService();
      const advice = getMockAdvice();
      repository.getAdviceByCountry = jest.fn().mockReturnValue(advice);

      expect(service.getAdvice(advice.country.name)).resolves.toEqual({
        advice,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw HTTP 404 error if no advice is found", () => {
      const service = adviceService();
      repository.getAdviceByCountry = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(notFoundError);
      const country = "non-existent-country";
      expect(service.getAdvice(country)).rejects.toThrow(errorResult);
    });
  });

  describe("getAllAdvice", () => {
    it("should resolve and return expected advice levels", () => {
      const service = adviceService();
      const advices = getMockAdvices();
      const adviceOnly = advices.map((advice) => {
        return {
          country: advice.country,
          adviceLevel: advice.adviceLevel,
        };
      });
      repository.getAllAdviceLevels = jest.fn().mockReturnValue(adviceOnly);

      expect(service.getAllAdvice()).resolves.toEqual({
        countries: adviceOnly,
        log: {
          ...baseLog,
          accessTime: expect.any(String),
        },
      });
    });

    it("should throw an error if it could not connect to db", () => {
      const service = adviceService();
      repository.getAllAdviceLevels = jest.fn().mockReturnValue(undefined);

      const errorResult = new HTTPError(internalServerError);
      expect(service.getAllAdvice()).rejects.toThrow(errorResult);
    });
  });
});
