import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  @JoinColumn({ name: "created_by" })
  createdBy: UserEntity;

  @ManyToOne(() => CountryEntity, (country) => country.countryId, {
    eager: true,
  })
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

  @ManyToMany(() => UserEntity, { eager: true })
  @JoinTable({
    name: "review_users",
    joinColumn: {
      name: "review_id",
      referencedColumnName: "reviewId",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "userId",
    },
  })
  upvotedBy: UserEntity[];
}
