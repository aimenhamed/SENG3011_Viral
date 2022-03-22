import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { ArticleEntity } from "./Article.entity";
import { DashboardEntity } from "./Dashboard.entity";

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

  @ManyToOne(() => DashboardEntity, dashboard => dashboard.dashboardId,{
    eager: true,
  })
  activeDashboard: DashboardEntity;

  @ManyToMany(()=>DashboardEntity, {
    eager: true,
  })
  @JoinTable()
  dashboards: DashboardEntity[];

  @ManyToMany(()=>ArticleEntity, {
    eager: true,
  })
  @JoinTable()
  bookmarkedArticles: ArticleEntity;
}
