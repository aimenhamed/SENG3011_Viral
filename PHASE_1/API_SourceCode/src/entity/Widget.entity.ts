import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { WidgetType, GraphType, AxisType } from "../interfaces/IWidget";
import { DashboardEntity } from "../entity/Dashboard.entity";

@Entity({ name: "widgets", schema: "public" })
export class WidgetEntity {
  @PrimaryGeneratedColumn("uuid", { name: "widget_id" })
  widgetId: string;

  @ManyToOne(()=> DashboardEntity, dashboard => dashboard.dashboardId )
  dashboardId: DashboardEntity;

  @Column("enum", { name: "widget_type", nullable: false, enum: WidgetType })
  widgetType: WidgetType;
  
  @Column("enum", {name: "graph_type", nullable: true, enum: GraphType})
  graphType: GraphType;

  @Column("enum", {name: "x_axis", nullable: true, enum: AxisType})
  xAxis: AxisType;
  
  @Column("enum", {name: "y_axis", nullable: true, enum: AxisType})
  yAxis: AxisType;

  @Column("uuid", { name: "article_id", nullable: true })
  articleId: string;

  @Column("text", {
    array: true,
    name: "key_terms",
    nullable: false,
    default: () => "array[]::text[]",
  })
  keyTerms: string[];

  @Column("text", {name: "text", nullable: true})
  text: string;
}
