import { CountryEntity } from "../entity/Country.entity";
import { getRepository } from "typeorm";

export class CountryRepository {
  async getCountry(countryId: string): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity).findOne({
      where: {
        countryId,
      },
    });
  }
  async getCountryByName(
    countryName: string
  ): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity).findOne({
      relations: ["name"],
      where: {
        countryName,
      },
    });
  }
}
