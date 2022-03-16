import { WidgetEntity } from "../entity/Widget.entity";
import { getRepository } from "typeorm";

export class WidgetRepository {
  async saveWidget(newWidget: WidgetEntity): Promise<WidgetEntity> {
    return await getRepository(WidgetEntity).save(newWidget);
  }
}
