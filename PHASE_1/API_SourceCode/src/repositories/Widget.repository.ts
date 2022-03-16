import { WidgetEntity } from "../entity/Widget.entity";
import { DeleteResult, getRepository } from "typeorm";

export class WidgetRepository {
  async deleteWidget(widgetId: string): Promise<DeleteResult> {
    return await getRepository(WidgetEntity).delete({ widgetId });
  }

  async saveWidget(newWidget: WidgetEntity): Promise<WidgetEntity> {
    return await getRepository(WidgetEntity).save(newWidget);
  }
}
