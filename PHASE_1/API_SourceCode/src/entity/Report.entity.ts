import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleEntity } from "./Article.entity";

@Entity({ name: "report", schema: "public" })
export class ReportEntity {
  @PrimaryGeneratedColumn("uuid", { name: "report_id" })
  reportId: string;

  @ManyToOne(() => ArticleEntity, (article) => article.articleId)
  @JoinColumn({ name: "article_id" })
  article: ArticleEntity;

  @Column("uuid", { name: "article_id", nullable: false })
  articleId: string;

  @Column("text", {
    array: true,
    name: "locations",
    nullable: false,
    default: () => "array[]::text[]",
  })
  locations: string[];

  @Column("text", { name: "event_date", nullable: false })
  eventDate: string;

  @Column("text", {
    array: true,
    name: "diseases",
    nullable: false,
    default: () => "array[]::text[]",
  })
  diseases: string[];

  @Column("text", {
    array: true,
    name: "syndromes",
    nullable: false,
    default: () => "array[]::text[]",
  })
  syndromes: string[];
}
