import { getLogger } from "../../utils/Logger";
import {
  IAdviceSpecificSuccessResponse,
  IAdviceAllSuccessResponse,
} from "IApiResponses";
import { AdviceRepository } from "../../repositories/Advice.repository";
import { CommentRepository } from "../../repositories/Comment.repository";
import { HTTPError } from "../../utils/Errors";
import { internalServerError, notFoundError } from "../../utils/Constants";
import { convertAdviceEntityToInterface } from "../../converters/Advice.converter";
import { convertCommentEntityToSimpleInterface } from "../../converters/Comment.converter";
import { getLog } from "../../utils/Helpers";
import { FetchWrapper } from "../../modules/FetchWrapper";
import { CommentEntity } from "../../entity/Comment.entity";

export class AdviceService {
  private logger = getLogger();
  constructor(
    readonly adviceRepository: AdviceRepository,
    readonly commentRepository: CommentRepository,
    readonly fetchWrapper: FetchWrapper
  ) {}

  async getAdvice(country: string): Promise<IAdviceSpecificSuccessResponse> {
    const advice = await this.adviceRepository.getAdviceByCountry(country);

    if (advice === undefined) {
      this.logger.error(`No advice for country ${country} found in db`);
      throw new HTTPError(notFoundError);
    }
    const data = await this.fetchWrapper.getCountryDiseases(
      advice.country.code
    );
    const comments: CommentEntity[] =
      await this.commentRepository.getCommentsByCountry(advice.country.name);
    this.logger.info(
      `Advice found with country ${country}, responding to client`
    );
    return {
      advice: convertAdviceEntityToInterface(advice),
      data,
      comments: comments.map((c) => convertCommentEntityToSimpleInterface(c)),
      log: getLog(new Date()),
    };
  }

  async getAllAdvice(): Promise<IAdviceAllSuccessResponse> {
    const advices = await this.adviceRepository.getAllAdviceLevels();

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
}
