import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReportEntity } from "./Report.entity";

@Entity({ name: "article", schema: "public" })
export class ArticleEntity {
  @PrimaryGeneratedColumn("uuid", { name: "article_id" })
  articleId: string;

  @Column("text", { name: "url", nullable: false })
  url: string;

  @Column("text", { name: "date_of_publication", nullable: false })
  dateOfPublication: string;

  @Column("text", { name: "headline", nullable: false })
  headline: string;

  @Column("text", { name: "main_text", nullable: false })
  mainText: string;

  @OneToMany(() => ReportEntity, (report) => report.article, {
    eager: true,
    cascade: true,
  })
  public reports: ReportEntity[];
}
