import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "country", schema: "public" })
export class CountryEntity {
  @PrimaryGeneratedColumn("uuid", { name: "country_id" })
  countryId: string;

  @Column("text", { name: "name", nullable: false })
  name: string;

  @Column("text", { name: "code", nullable: false })
  code: string;

  @Column("integer", {
    array: true,
    name: "coords",
    nullable: false,
    default: () => "array[]::integer[]",
  })
  coords: number[];
}
