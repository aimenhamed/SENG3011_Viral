import { Advice } from "IAdvice";
import { AdviceEntity } from "../entity/Advice.entity";

export const convertAdviceEntityToInterface = (
  entity: AdviceEntity
): Advice => {
  return {
    adviceId: entity.adviceId,
    url: entity.url,
    country: entity.country,
    continent: entity.continent,
    adviceLevel: entity.adviceLevel,
    latestAdvice: entity.latestAdvice,
    lastUpdate: entity.lastUpdate,
  };
};
