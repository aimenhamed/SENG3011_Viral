import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ArticleEntity } from "./Article.entity";
import { CountryEntity } from "./Country.entity";

@Entity({ name: "user", schema: "public" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  userId: string;

  @Column("text", { name: "name", nullable: false })
  name: string;

  @Column("text", { name: "email", nullable: false })
  email: string;

  @Column("text", { name: "password", nullable: false })
  password: string;

  @ManyToMany(() => ArticleEntity, {
    eager: true,
  })
  @JoinTable({
    name: "user_articles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "userId",
    },
    inverseJoinColumn: {
      name: "article_id",
      referencedColumnName: "articleId",
    },
  })
  bookmarkedArticles: ArticleEntity[];

  @ManyToMany(() => CountryEntity, { eager: true })
  @JoinTable({
    name: "user_countries",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "userId",
    },
    inverseJoinColumn: {
      name: "country_id",
      referencedColumnName: "countryId",
    },
  })
  bookmarkedCountries: CountryEntity[];
}
