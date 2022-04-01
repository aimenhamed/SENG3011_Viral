import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./User.entity";
import { CountryEntity } from "./Country.entity";
@Entity({ name: "comment", schema: "public" })
export class CommentEntity {
  @PrimaryGeneratedColumn("uuid", { name: "comment_id" })
  commentId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId)
  @JoinColumn({ name: "created_by" })
  createdBy: UserEntity;

  @ManyToOne(() => CountryEntity, (country) => country.countryId)
  @JoinColumn({ name: "country" })
  country: CountryEntity;

  @Column("text", { name: "message" })
  message: string;

  @Column("date", { name: "created_date" })
  date: Date;
}
