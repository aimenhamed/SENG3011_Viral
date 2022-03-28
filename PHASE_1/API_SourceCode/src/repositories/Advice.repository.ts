import { AdviceEntity } from "../entity/Advice.entity";
import { getRepository } from "typeorm";

export class AdviceRepository {
  async getAdviceByCountry(country: string): Promise<AdviceEntity | undefined> {
    return await getRepository(AdviceEntity).findOne({ country });
  }
}
