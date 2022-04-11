import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { AdviceEntity } from "./Advice.entity";
import { CommentEntity } from "./Comment.entity";
import { ReviewEntity } from "./Review.entity";

@Entity({ name: "country", schema: "public" })
export class CountryEntity {
  @PrimaryGeneratedColumn("uuid", { name: "country_id" })
  countryId: string;

  @Column("text", { name: "country_name", nullable: false })
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

  @OneToOne(() => AdviceEntity, (advice) => advice.country)
  advice: AdviceEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.country)
  comments: CommentEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.country)
  reviews: ReviewEntity[];
}
