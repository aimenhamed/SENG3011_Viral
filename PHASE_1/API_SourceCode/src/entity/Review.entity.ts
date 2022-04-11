import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./User.entity";
import { CountryEntity } from "./Country.entity";

@Entity({ name: "review", schema: "public" })
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid", { name: "review_id" })
  reviewId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId, { eager: true })
  @JoinColumn({ name: "review_created_by" })
  reviewCreatedBy: UserEntity;

  @ManyToOne(() => CountryEntity, (country) => country.countryId)
  @JoinColumn({ name: "country" })
  country: CountryEntity;

  @Column("decimal", { name: "rating" })
  rating: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "main_text" })
  mainText: string;

  @Column("timestamp", { name: "created_date" })
  date: Date;
}
