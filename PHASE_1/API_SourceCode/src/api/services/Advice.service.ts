import { getLogger } from "../../utils/Logger";
import { IAdviceSpecificSuccessResponse } from "IApiResponses";
import { AdviceRepository } from "../../repositories/Advice.repository";
import { HTTPError } from "../../utils/Errors";
import { notFoundError } from "../../utils/Constants";
import { convertAdviceEntityToInterface } from "../../converters/Advice.converter";
import { getLog } from "../../utils/Helpers";

export class AdviceService {
  private logger = getLogger();
  constructor(readonly adviceRepository: AdviceRepository) {}

  async getAdvice(country: string): Promise<IAdviceSpecificSuccessResponse> {
    const advice = await this.adviceRepository.getAdviceByCountry(country);

    if (advice === undefined) {
      this.logger.error(`No advice for country ${country} found in db`);
      throw new HTTPError(notFoundError);
    }

    this.logger.info(
      `Advice found with country ${country}, responding to client`
    );
    return {
      advice: convertAdviceEntityToInterface(advice),
      log: getLog(new Date()),
    };
  }
}
