import { AdviceEntity } from "../entity/Advice.entity";
import { getRepository } from "typeorm";
import { IAdviceOnly } from "../interfaces/IAdvice";

export class AdviceRepository {
  async getAdviceByCountry(country: string): Promise<AdviceEntity | undefined> {
    return await getRepository(AdviceEntity).findOne({ country });
  }

  async getAllAdviceLevels(): Promise<IAdviceOnly[] | undefined> {
    return await getRepository(AdviceEntity)
      .createQueryBuilder("advice")
      .select(["advice.country", "advice.adviceLevel"])
      .getMany();
  }
}
