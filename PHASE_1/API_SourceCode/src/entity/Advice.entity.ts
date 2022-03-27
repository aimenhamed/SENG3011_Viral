import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "advice", schema: "public" })
export class AdviceEntity {
  @PrimaryGeneratedColumn("uuid", { name: "advice_id" })
  adviceId: string;

  @Column("text", { name: "url", nullable: false })
  url: string;

  @Column("text", { name: "country", nullable: false })
  country: string;

  @Column("text", { name: "continent", nullable: true })
  continent: string;

  @Column("text", { name: "advice_level", nullable: true })
  adviceLevel: string;

  @Column("text", { name: "latest_advice", nullable: true })
  latestAdvice: string;

  @Column("date",{ name: "last_update", nullable: false })
  lastUpdate: Date;
}
