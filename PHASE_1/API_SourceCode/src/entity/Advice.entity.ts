import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CountryEntity } from "./Country.entity";

@Entity({ name: "advice", schema: "public" })
export class AdviceEntity {
  @PrimaryGeneratedColumn("uuid", { name: "advice_id" })
  adviceId: string;

  @Column("text", { name: "url", nullable: false })
  url: string;

  @OneToOne(() => CountryEntity, (country) => country.advice, {
    nullable: true,
  })
  @JoinColumn({ name: "country" })
  country: CountryEntity;

  @Column("text", { name: "continent", nullable: true })
  continent: string;

  @Column("text", { name: "advice_level", nullable: true })
  adviceLevel: string;

  @Column("text", { name: "latest_advice", nullable: true })
  latestAdvice: string;

  @Column("date", { name: "last_update", nullable: false })
  lastUpdate: Date;
}
