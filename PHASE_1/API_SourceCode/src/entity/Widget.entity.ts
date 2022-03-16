import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { WidgetType } from "IWidget";

@Entity({ name: "widgets", schema: "public" })
export class WidgetEntity {
  @PrimaryGeneratedColumn("uuid", { name: "widget_id" })
  widgetId: string;

  @Column("uuid", { name: "dashboard_id", nullable: false })
  dashboardId: string;

  @Column("enum", { name: "widget_type", nullable: false })
  widgetType: WidgetType;

  @Column("uuid", { name: "article_id", nullable: false })
  articleId: string;
}
