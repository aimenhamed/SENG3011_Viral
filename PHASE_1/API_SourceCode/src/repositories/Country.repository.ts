import { CountryEntity } from "../entity/Country.entity";
import { getRepository } from "typeorm";
import { IAdviceOnly } from "IAdvice";

export class CountryRepository {
  async getCountry(countryId: string): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity)
      .createQueryBuilder("country")
      .leftJoinAndSelect("country.advice", "advice")
      .leftJoinAndSelect("country.comments", "comment")
      .leftJoinAndSelect("country.reviews", "review")
      .where("country.countryId = :countryId", { countryId })
      .getOne();
  }

  async getCountryByName(
    countryName: string
  ): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity)
      .createQueryBuilder("country")
      .where("name LIKE :countryName", { countryName })
      .getOne();
  }

  async getAllAdviceLevels(): Promise<IAdviceOnly[] | undefined> {
    return await getRepository(CountryEntity)
      .createQueryBuilder("country")
      .leftJoinAndSelect("country.advice", "advice")
      .select([
        "country.code as country",
        'advice.adviceLevel as "adviceLevel"',
      ])
      .orderBy("country")
      .getRawMany();
  }

  async getAllCountryInfoByName(
    countryName: string
  ): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity)
      .createQueryBuilder("country")
      .leftJoinAndSelect("country.advice", "advice")
      .leftJoinAndSelect("country.comments", "comment")
      .where("name LIKE :countryName", { countryName })
      .getOne();
  }
}
