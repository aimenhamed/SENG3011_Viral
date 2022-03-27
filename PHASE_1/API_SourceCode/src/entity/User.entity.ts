import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ArticleEntity } from "./Article.entity";

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

  @ManyToMany(()=>ArticleEntity, {
    eager: true,
  })
  @JoinTable()
  bookmarkedArticles: ArticleEntity[];

  @Column("text", {
    array: true,
    name: "widgets",
    nullable: false,
    default: () => "array[]::text[]",
  })
  bookmarkedCountries: string[];
}
