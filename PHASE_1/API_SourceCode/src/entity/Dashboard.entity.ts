import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../entity/User.entity";
import { WidgetEntity } from "../entity/Widget.entity"

@Entity({ name: "dashboard", schema: "public" })
export class DashboardEntity {
  @PrimaryGeneratedColumn("uuid", { name: "dashboard_id" })
  dashboardId: string;

  @ManyToOne(() => UserEntity, user=>user.userId)
  createdBy: UserEntity;

  @OneToMany(() => WidgetEntity, widget => widget.widgetId)
  widgets: WidgetEntity[];

  @OneToMany(() => UserEntity, user => user.userId)
  selectedBy: UserEntity[]; // for user's activeDashboard

  @ManyToOne(()=>UserEntity, user => user.userId)
  user: UserEntity // for user's dashboards
}
