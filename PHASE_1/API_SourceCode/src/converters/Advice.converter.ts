import { Advice, IAdviceOnly } from "IAdvice";
import { AdviceEntity } from "../entity/Advice.entity";

export const convertAdviceEntityToInterface = (
  entity: AdviceEntity
): Advice => {
  return {
    adviceId: entity.adviceId,
    url: entity.url,
    continent: entity.continent,
    adviceLevel: entity.adviceLevel,
    latestAdvice: entity.latestAdvice,
    lastUpdate: entity.lastUpdate,
  };
};
