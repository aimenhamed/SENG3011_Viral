import { Country } from "ICountry";
import { CountryEntity } from "../entity/Country.entity";

export const convertCountryEntityToInterface = (
  entity: CountryEntity
): Country => {
  return {
    countryId: entity.countryId,
    name: entity.name,
    code: entity.code,
    coords: entity.coords,
  };
};
