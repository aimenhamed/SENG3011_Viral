import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("uuid", {
    array: true,
    name: "dashboards",
    nullable: false,
    default: () => "array[]::uuid[]",
  })
  dashboards: string[];

  @Column("uuid", {
    array: true,
    name: "bookmarked_articles",
    nullable: false,
    default: () => "array[]::uuid[]",
  })
  bookmarkedArticles: string[];
}
