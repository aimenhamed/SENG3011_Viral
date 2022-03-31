import { CountryEntity } from "../entity/Country.entity";
import { getRepository } from "typeorm";

export class CountryRepository {
  async getCountryByName(countryName: string): Promise<CountryEntity | undefined> {
    return await getRepository(CountryEntity).findOne({
      relations: ["name"],
      where: {
        countryName,
      },
    });
  }
}