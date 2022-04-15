import { AdviceEntity } from "../entity/Advice.entity";
import { getRepository } from "typeorm";
import { IAdviceOnly } from "../interfaces/IAdvice";
import { CountryEntity } from "../entity/Country.entity";

export class AdviceRepository {
  async getAdviceByCountryId(
    countryId: string
  ): Promise<AdviceEntity | undefined> {
    return await getRepository(AdviceEntity)
      .createQueryBuilder("advice")
      .leftJoinAndSelect("advice.country", "country")
      .where("country.countryId LIKE :countryId", { countryId })
      .getOne();
  }

  async getAdviceByCountry(name: string): Promise<AdviceEntity | undefined> {
    return await getRepository(AdviceEntity)
      .createQueryBuilder("advice")
      .leftJoinAndSelect("advice.country", "country")
      .where("name LIKE :name", { name })
      .getOne();
  }

  async getAllAdviceLevels(): Promise<IAdviceOnly[] | undefined> {
    // aliasing is required as it ignores IAdviceOnly interface for some reason
    return await getRepository(AdviceEntity)
      .createQueryBuilder("advice")
      .innerJoinAndSelect("advice.country", "country")
      .select([
        "country.code as country",
        'advice.adviceLevel as "adviceLevel"',
      ])
      .getRawMany();
  }
}
