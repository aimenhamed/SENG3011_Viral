import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dashboard", schema: "public" })
export class DashboardEntity {
  @PrimaryGeneratedColumn("uuid", { name: "dashboard_id" })
  dashboardId: string;

  @Column("uuid", { name: "user_id", nullable: false })
  userId: string;

  @Column("uuid", {
    array: true,
    name: "widgets",
    nullable: false,
    default: () => "array[]::uuid[]",
  })
  widgets: string[];
}
