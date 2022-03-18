import { WidgetEntity } from "../entity/Widget.entity";
import { DeleteResult, getRepository } from "typeorm";

export class WidgetRepository {
  async getWidgetById(widgetIds: string[]): Promise<WidgetEntity[]> {
    return await getRepository(WidgetEntity)
      .createQueryBuilder("widgets")
      .where("widgets.widget_id = ANY (:widgetIds)", { widgetIds })
      .getMany();
  }

  async deleteWidget(widgetId: string): Promise<DeleteResult> {
    return await getRepository(WidgetEntity).delete({ widgetId });
  }

  async saveWidget(newWidget: WidgetEntity): Promise<WidgetEntity> {
    return await getRepository(WidgetEntity).save(newWidget);
  }
}
